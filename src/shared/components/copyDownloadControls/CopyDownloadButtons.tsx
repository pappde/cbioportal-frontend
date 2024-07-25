import * as React from 'react';
import { If } from 'react-if';
import { Button, ButtonGroup } from 'react-bootstrap';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { ICopyDownloadInputsProps } from './ICopyDownloadControls';
import { getServerConfig } from '../../../config/config';
import { ExternalToolConfig } from '../ExternalTools/ExternalToolConfig';
import { ExternalTool } from '../ExternalTools/ExternalTool';
import { isExternalToolAvailable } from '../ExternalTools/ExternalToolConfigUtils';

export interface ICopyDownloadButtonsProps extends ICopyDownloadInputsProps {
    copyButtonRef?: (el: HTMLButtonElement | null) => void;
}

export class CopyDownloadButtons extends React.Component<
    ICopyDownloadButtonsProps,
    {}
> {
    public static defaultProps = {
        className: '',
        copyLabel: '',
        downloadLabel: '',
        showCopy: true,
        showDownload: true,
        showCopyMessage: false,
    };

    get baseTooltipProps() {
        return {
            placement: 'top',
            mouseLeaveDelay: 0,
            mouseEnterDelay: 0.5,
        };
    }

    copyButton() {
        const button = (
            <button
                ref={this.props.copyButtonRef}
                className="btn btn-sm btn-default"
                data-clipboard-text="NA"
                id="copyButton"
                onClick={this.props.handleCopy}
            >
                {this.props.copyLabel} <i className="fa fa-clipboard" />
            </button>
        );

        // We need two separate tooltips to properly show/hide "Copied" text, and switch between "Copy" and "Copied".
        // (Also, we need to manually set the visibility due to async rendering issues after clicking the button)
        return (
            <DefaultTooltip
                overlay={<span className="alert-success">Copied!</span>}
                visible={this.props.showCopyMessage}
                {...this.baseTooltipProps}
                overlayClassName={this.props.className}
            >
                <DefaultTooltip
                    overlay={<span>Copy</span>}
                    visible={this.props.showCopyMessage ? false : undefined}
                    {...this.baseTooltipProps}
                    overlayClassName={this.props.className}
                >
                    {button}
                </DefaultTooltip>
            </DefaultTooltip>
        );
    }

    downloadButton() {
        return (
            <DefaultTooltip
                overlay={<span>Download TSV</span>}
                {...this.baseTooltipProps}
                overlayClassName={this.props.className}
            >
                <Button className="btn-sm" onClick={this.props.handleDownload}>
                    {this.props.downloadLabel}{' '}
                    <i className="fa fa-cloud-download" />
                </Button>
            </DefaultTooltip>
        );
    }

    buttonsExternalTools() {
        // TECH: <If condition={this.props.showDownload}> was not working with returning multiple items in JSX.Element[], so moved the conditional here.
        if (!this.props.showDownload) {
            return null;
        }

        const config = getServerConfig().external_tools;
        if (!config) {
            return null;
        }

        return config
            .filter((tool: ExternalToolConfig) => isExternalToolAvailable(tool))
            .map((tool: ExternalToolConfig, index: number) => {
                console.log('render:' + tool.id);
                return (
                    <ExternalTool
                        key={tool.id}
                        toolConfig={tool}
                        baseTooltipProps={this.baseTooltipProps}
                        downloadData={this.props.downloadData}
                        overlayClassName={this.props.className}
                    />
                );
            });
    }

    public render() {
        return (
            <span className={this.props.className}>
                <ButtonGroup className={this.props.className}>
                    <If condition={this.props.showCopy}>{this.copyButton()}</If>
                    <If condition={this.props.showDownload}>
                        {this.downloadButton()}
                    </If>
                    {this.buttonsExternalTools()}
                </ButtonGroup>
            </span>
        );
    }
}
