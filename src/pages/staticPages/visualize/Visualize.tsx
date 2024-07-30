import * as React from 'react';
import { observer } from 'mobx-react';
import Helmet from 'react-helmet';
import { PageLayout } from 'shared/components/PageLayout/PageLayout';

import './styles.scss';
import styles from './visualize.module.scss';
import { getNCBIlink } from 'cbioportal-frontend-commons';
import { getServerConfig } from 'config/config';

@observer
export default class Visualize extends React.Component<{}, {}> {
    /**
     * Display the 'visualize_html' data associated with serverConfig.custom_buttons
     * @returns JSX.element
     */
    externalToolsSection() {
        const displayButtons = getServerConfig().custom_buttons?.filter(
            button => button.visualize_href
        );
        if (!displayButtons || displayButtons.length === 0) {
            return;
        }

        return (
            <>
                <hr />

                <h2>3rd party tools not maintained by cBioPortal community</h2>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {displayButtons.map((button, index) => (
                        <div key={index} style={{ marginTop: 20 }}>
                            <h2>
                                <a href={button.visualize_href} target="_blank">
                                    {button.visualize_title}
                                </a>
                            </h2>
                            <p>
                                {button.visualize_description}
                                <a href={button.visualize_href} target="_blank">
                                    Try it!
                                </a>
                            </p>
                            {button.visualize_image_src && (
                                <a href={button.visualize_href} target="_blank">
                                    <img
                                        className="tile-image top-image"
                                        alt={button.visualize_title}
                                        src={button.visualize_image_src}
                                    />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </>
        );
    }

    public render() {
        return (
            <PageLayout className={'whiteBackground staticPage'}>
                <Helmet>
                    <title>
                        {'cBioPortal for Cancer Genomics::Visualize Your Data'}
                    </title>
                </Helmet>

                <h1>Visualize Your Data</h1>

                <h2 id="download-and-install-a-local-version-of-cbioportal">
                    1. Download and install a local version of cBioPortal
                </h2>
                <ul>
                    <li>
                        The source code of cBioPortal is available on{' '}
                        <a href="https://github.com/cBioPortal/cbioportal">
                            GitHub
                        </a>{' '}
                        under the terms of Affero GPL V3.
                    </li>
                    <li>
                        Please note that, installing a local version requires
                        system administration skills, for example, installing
                        and configuring Tomcat and MySQL. With limited
                        resources, we cannot provide technical support on system
                        administration.
                    </li>
                </ul>

                <h2>2. We host data for you (academic use)</h2>
                <ul>
                    <li>
                        Public data will be available to everyone. Suggestions
                        on data sets are welcome.
                    </li>
                    <li>
                        Please{' '}
                        <a href="mailto:cbioportal@googlegroups.com?subject=Uploading public data">
                            contact us
                        </a>{' '}
                        for details.
                    </li>
                </ul>

                <h2>3. Commercial support</h2>
                <ul>
                    <li>
                        <a href="http://thehyve.nl" target="_blank">
                            The Hyve
                        </a>{' '}
                        is an open source software company that provides
                        commercial support for cBioPortal. They can help with
                        deployment, data loading, development, consulting and
                        training. Please{' '}
                        <a href="http://thehyve.nl/contact/" target="_blank">
                            contact The Hyve
                        </a>{' '}
                        for details.
                    </li>
                </ul>

                <hr />

                <h2>
                    The following tools are for visualization and analysis of
                    custom datasets
                </h2>

                <div className="alert alert-info" role="alert">
                    When using these tools in your publication,{' '}
                    <b>please cite</b>{' '}
                    <a href={getNCBIlink('/pubmed/23550210')}>
                        Gao et al. <i>Sci. Signal.</i> 2013
                    </a>{' '}
                    &amp;{' '}
                    <a href="http://cancerdiscovery.aacrjournals.org/content/2/5/401.abstract">
                        Cerami et al. <i>Cancer Discov.</i> 2012
                    </a>
                    .
                </div>

                <div style={{ display: 'flex' }} className={styles.toolArray}>
                    <div style={{ marginRight: 60 }}>
                        <h2>
                            <a href="oncoprinter">OncoPrinter</a>
                        </h2>
                        <p>
                            Generates oncoprints from your own data.{' '}
                            <a href="/oncoprinter">Try it!</a>
                        </p>
                        <a href="oncoprinter">
                            <img
                                className="tile-image top-image"
                                alt="Oncoprint"
                                src={require('./images/oncoprint_example_small.png')}
                            />
                        </a>
                    </div>

                    <div>
                        <h2>
                            <a href="mutation_mapper">MutationMapper</a>
                        </h2>
                        <p>
                            Maps mutations on a linear protein and its domains
                            (lollipop plots).{' '}
                            <a href="mutation_mapper">Try it!</a>
                        </p>
                        <a href="mutation_mapper">
                            <img
                                alt="MutationMapper"
                                style={{ height: 147 }}
                                src={require('./images/lollipop_example.png')}
                            />
                        </a>
                    </div>
                </div>

                {this.externalToolsSection()}
            </PageLayout>
        );
    }
}
