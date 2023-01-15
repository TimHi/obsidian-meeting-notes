import moment from "moment";
import { FileManager, TFile, Vault } from "obsidian";
import path from "path";

export default class FileRenderer {
	vault: Vault;
	fileManager: FileManager;

	//TODO: Export to settings create template for it
	defaultContent =
		"# {{Date}} Topic \n \n## Participants \n \n  \n \n---- \n \n## Preparation \n \n  \n \n---- \n \n## Notes \n \n  \n \n---- \n \n## Follow ups \n \n  \n \n---- \n \n ";

	constructor(vault: Vault, fileManager: FileManager) {
		this.vault = vault;
		this.fileManager = fileManager;
	}

	/**
	 * Renames a given File to the format DD-MMM-YYYY HH-mm-ss
	 *
	 * @param file File to rename
	 */
	async ChangeFileName(file: TFile) {
		const dateName = moment(Date()).format("DD-MMM-YYYY HH-mm-ss");
		const dirname = path.dirname(file.path);
		const newPath = path.join(dirname, `${dateName}.${file.extension}`);

		await this.fileManager.renameFile(file, newPath);
	}

	async FillNewNote(file: TFile) {
		const todayDate = new Date().toLocaleDateString().toString();
		const content = this.defaultContent.replace("{{Date}}", todayDate);

		try {
			await this.vault.modify(file, content);
		} catch (error) {
			console.error(`Error modifying file (path="${file.path})"`);
			throw error;
		}
	}
}
