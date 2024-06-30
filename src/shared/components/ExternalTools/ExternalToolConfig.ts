
// define an ExternalTool to display in CopyDownloadButtons
// clicking on the button will launch it using the url_format
export type ExternalToolConfig = {
    id: string;
    name: string;
    tooltip: string;
    iconImageSrc: string;
    required_installed_font_family: string;
    url_format: string;
};

// RFC87
export const ExternalToolConfigDefaults : ExternalToolConfig[] = [
    {
        id: 'avm',
        name: 'AVM for cBioPortal',
        tooltip: 'Launch AVM for cBioPortal with this data (copied to clipboard)',
        // HACK: storing image locally to avoid external dependency, but need to make sure webpack loads it so we require() here
        iconImageSrc: require('./images/avm_icon.png'),   
        required_installed_font_family: 'AVMInstalled',
        //fnordoriginal
        // url_format: 'avm://?${downloadedFilePath}&-AutoMode=true&-ProjectNameHint=${studyName}'
        //url_format: 'avm://?importdata&-AutoMode=true&-ProjectNameHint=${studyName}-Data=${data}'
        url_format: 'avm://?importclipboard&-AutoMode=true&-ProjectNameHint=${studyName}'
    }
];
