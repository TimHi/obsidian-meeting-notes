import { App, Plugin, PluginSettingTab, Setting, TAbstractFile, TFile } from 'obsidian';
import FileRenderer from "./src/filehandler/FileRenderer"

interface MeetingNotesSettings {
	meetingNoteFolder: string;
}

const DEFAULT_SETTINGS: MeetingNotesSettings = {
	meetingNoteFolder: "MeetingNotes",
}

export default class MeetingNotes extends Plugin {
	settings: MeetingNotesSettings;
	fileHandler: FileRenderer
	
	async createFileCallback(file: TFile, meetingFolderName: string) {
		await this.loadSettings(); //Refresh settings to get the correct folder, TODO: check potential better solutions which save this read 
		if(file.parent.name === meetingFolderName){
			this.fileHandler.FillNewNote(file);			
		}
	}

	async onload() {
		this.fileHandler = new FileRenderer(this.app.vault);
		await this.loadSettings();

		this.addSettingTab(new MeetingNotesSettingTab(this.app, this));

		this.app.vault.on("create", async (file: TFile) => {
			if(file.extension !== undefined){
				await this.createFileCallback(file, this.settings.meetingNoteFolder);	
			}
		});
		console.log("Info: Community plugin Meeting notes loaded.")
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


