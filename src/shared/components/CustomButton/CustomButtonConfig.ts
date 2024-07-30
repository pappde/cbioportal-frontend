import { FontDetector } from './utils/FontDetector';
import { ICustomButtonConfig } from './ICustomButton';
import memoize from 'memoize-weak-decorator';

/**
 * Define a CustomButton to display (in CopyDownloadButtons).
 * Clicking on the button will launch it using the url_format
 */
export class CustomButtonConfig implements ICustomButtonConfig {
    id: string;
    name: string;
    tooltip: string;
    image_src: string;
    required_user_agent?: string;
    required_installed_font_family?: string;
    url_format: string;

    public static parseCustomButtonConfigs(customButtonsJson: string) : ICustomButtonConfig[] {
        if (!customButtonsJson) {
            return [];
        } else {
            //fnordtest as Object
            return JSON.parse(
                customButtonsJson
            ) as ICustomButtonConfig[];   
        }    
    }

    /**
     * Creates a new instance of the CustomButtonConfig class.
     * @param config - The configuration object for the custom button.
     */
    constructor(config: {
        id: string;
        name: string;
        tooltip: string;
        iconImageSrc: string;
        required_platform?: string;
        required_installed_font_family?: string;
        url_format: string;
    }) {
        this.id = config.id;
        this.name = config.name;
        this.tooltip = config.tooltip;
        this.image_src = config.iconImageSrc;
        this.required_user_agent = config.required_platform;
        this.required_installed_font_family =
            config.required_installed_font_family;
        this.url_format = config.url_format;
    }

    /**
     * Checks if the CustomButton is available in the current context per the defined reuqirements.
     * @returns A boolean value indicating if is available.
     */
    isAvailable(): boolean {
        const resultComputed = this.computeIsCustomButtonAvailable();
        // console.log(toolConfig.id + '.isAvailable.Computed:' + resultComputed);
        return resultComputed;
    }

    @memoize
    checkToolRequirementsPlatform(
        required_userAgent: string | undefined
    ): boolean {
        if (!required_userAgent) {
            return true;
        }

        return navigator.userAgent.indexOf(required_userAgent) >= 0;
    }

    // OPTIMIZE: want to @memoize, but if user installs font, it wouldn't be detected.
    checkToolRequirementsFontFamily(fontFamily: string | undefined): boolean {
        if (!fontFamily) {
            return true;
        }

        const detector = new FontDetector();
        const result = detector.detect(fontFamily);
        return result;
    }

    computeIsCustomButtonAvailable(): boolean {
        if (!this.checkToolRequirementsPlatform(this.required_user_agent)) {
            return false;
        }

        if (
            !this.checkToolRequirementsFontFamily(
                this.required_installed_font_family
            )
        ) {
            return false;
        }

        return true;
    }
 
}

