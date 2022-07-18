import { TFile } from "obsidian";
import FileRenderer from "./FileRenderer";

export default class FileService {
    fileRenderer: FileRenderer;

    constructor(fileRenderer: FileRenderer){
        this.fileRenderer = fileRenderer;
    }

    /**
	 * Create a new file creation callback, fills the new note if it is a meeting now
	 * @param file Newly created file
	 * @param meetingFolderName Name of the user defined folder
	 */
	async createFileCreationCallback(file: TFile, meetingFolderName: string) {
		if(this.isNewMeetingNote(file, meetingFolderName)) {
			this.fileRenderer.FillNewNote(file);			
		}
	}

    /**
     * Tests wether a note qualifys as a meeting note. The note needs to have a parent folder with the same name as the 
     * user defined in the settings. 
     * Also checks if the note is empty as the vault.on("create") callback seems to be called for existing notes when obsidian openes.
     * 
     * @param file Note to test
     * @param meetingFolderName Name of the user defined folder
     * @returns True if the note is a meeting note, false otherwise
     */
	isNewMeetingNote(
		file: TFile,
		meetingFolderName: string,
	) {
		return this.isFileInMeetingFolder(file, meetingFolderName) && this.isEmptyFile(file);
	}

    /**
     * Checks wether a given file is empty by looking at the stat size.
     * @param file File to check
     * @returns True if the file is empty, false otherwise
     */
    isEmptyFile(file: TFile){
        return file.stat.size === 0;
    }

    /**
     * Checks wether a given file is in a given folder by looking at the files parent name.
     * 
     * @param file File to check
     * @param meetingFolderName Name of the folder to check
     * @returns True if the files parent folder has the same name, false otherwise
     */
    isFileInMeetingFolder(file: TFile, meetingFolderName: string){
        return file.parent.name === meetingFolderName;
    }
}
