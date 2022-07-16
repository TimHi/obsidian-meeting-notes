import { TFile, Vault } from 'obsidian';

export default class FileRenderer {
    vault: Vault;

    //TODO: Export to settings create template for it
    defaultContent  = "# {Date} Topic \n \n## Participants \n \n  \n \n---- \n \n## Preperation \n \n  \n \n---- \n \n## Notes \n \n  \n \n---- \n \n## Follow ups \n \n  \n \n---- \n \n ";
    
    constructor(vault: Vault){
        this.vault = vault;
    }

    async FillNewNote(file: TFile) {
        const todayDate = new Date().toLocaleDateString().toString();
        const content = this.defaultContent.replace("{Date}", todayDate);
        try {
            await this.vault.modify(file, content);
          } catch (error) {
            console.error(`Error modifying e file (path="${file.path})"`);
            throw error;
          }
    }
}

