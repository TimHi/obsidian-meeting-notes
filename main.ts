import { App, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import FileService from 'src/filehandler/FileService';
import FileRenderer from "./src/filehandler/FileRenderer"

interface MeetingNotesSettings {
	meetingNoteFolder: string;
}

const DEFAULT_SETTINGS: MeetingNotesSettings = {
	meetingNoteFolder: "MeetingNotes",
}

export default class MeetingNotes extends Plugin {
	settings: MeetingNotesSettings;
	fileHandler: FileRenderer;
	fileService: FileService;

	/**
	 * Construct the needed services.
	 */
	private registerServices() {
		this.fileHandler = new FileRenderer(this.app.vault);
		this.fileService = new FileService(this.fileHandler);
	}

	async onload() {
		this.registerServices();
		await this.loadSettings();

		this.addSettingTab(new MeetingNotesSettingTab(this.app, this));

		this.app.vault.on("create", async (file: TFile) => {
			// on "create" callback is also triggered when folders are created, filter by checking wether the
			// new file has an extension
			if(file.extension !== undefined) {
				await this.fileService.createFileCreationCallback(file, this.settings.meetingNoteFolder);	
			}
		});
		console.log("Info: Community plugin Meeting notes loaded.");
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class MeetingNotesSettingTab extends PluginSettingTab {
	plugin: MeetingNotes;

	constructor(app: App, plugin: MeetingNotes) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Meeting Notes Settings'});

		new Setting(containerEl)
			.setName('Meeting Notes Folder Name')
			.setDesc('Folder which will notes will be created with the template')
			.addText(text => text
				.setPlaceholder('Enter your meeting folder name')
				.setValue(this.plugin.settings.meetingNoteFolder)
				.onChange(async (value) => {
					this.plugin.settings.meetingNoteFolder = value;
					await this.plugin.saveSettings();
				}));
	}	
}


