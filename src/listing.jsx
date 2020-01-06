import React, { Component } from 'react';
import styled from 'styled-components/macro';
import Octokit from '@octokit/rest';

import theme from './theme';
import mediaQueries from './media-queries';

import { Container } from './components/container';
import { Row } from './components/row';
import { LoadingSpinner } from './components/loading-spinner';
import { Button } from './components/button';
import SmallArrow from './components/small-arrow';

import IssueListing from './issue-listing';
import SaveKey from './save-key';

const ListingContainer = styled(Container)``;
ListingContainer.displayName = 'ListingContainer';

const RepoList = styled.ul``;
RepoList.displayName = 'RepoList';

const ColA = styled.div`
    width: 100%;
    padding-left: ${theme.gutter};
    padding-right: ${theme.gutter};

        @media (min-width: ${mediaQueries.min.medium}) {
            width: 33.3333%;
        }
`;
ColA.displayName = 'ColA';

const ColB = styled.div`
    width: 100%;

        @media (min-width: ${mediaQueries.min.medium}) {
            width: 66.6667%;
        }
`;
ColB.displayName = 'ColB';

const FullWidthCol = styled.div`
    width: 100%;
    padding-left: ${theme.gutter};
    padding-right: ${theme.gutter};

    &.slideup, &.slidedown {
        @media (min-width: ${mediaQueries.min.medium}) {
            max-height: 100%;
        }
    }

    *[class*='listing__RepoToggle'] *[class*='button__Icon'] {
        @media (min-width: ${mediaQueries.min.medium}) {
            display: none;
        }
    }
`;
FullWidthCol.displayName = 'FullWidthCol';

const RepoAccordion = styled(FullWidthCol)``;
RepoAccordion.displayName = 'RepoAccordion';

const RepoToggle = styled(Button)`
    font-weight: normal;
    font-size: ${theme.xlargeBaseFont};

    *[class*='button__Text'] {
        padding: 0;
    }
`;
RepoToggle.displayName = 'RepoToggle';

const SelectRepoButton = styled(Button)`
    &.repo-selected {
        text-decoration: underline;
        color: ${theme.black};

        *[class*='small-arrow__SmallArrowContainer'] {
             border-bottom-color: ${theme.black};
        }
        
        &:hover {
            color: ${theme.primaryColor};

            *[class*='small-arrow__SmallArrowContainer'] {
                border-bottom-color: ${theme.primaryColor};
            }
        }
    }
`;
SelectRepoButton.displayName = 'SelectRepoButton';

export default class Listing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRepo: null,
            repos: '',
            reposLoaded: false,
            repoAccordionOpen: true
        };

        this.fetchRepos = this.fetchRepos.bind(this);
        this.selectRepo = this.selectRepo.bind(this);
        this.setRepoAccordion = this.setRepoAccordion.bind(this);
        this.toggleRepoAccordion = this.toggleRepoAccordion.bind(this);
        this.renderRepoList = this.renderRepoList.bind(this);
        
    }

    fetchRepos() {
        const octokit = new Octokit({
            auth: this.props.apiKey
        });

        octokit.repos.list({})
            .then(({ data }) => {
                this.setState({
                    repos: data,
                    reposLoaded: true
                });
            }).catch(err => {
                this.setState({
                    repos: [],
                    reposLoaded: true,
                    fieldError: "Github does not recognize this API Key, please try a different API Key."
                });
            });
    }

    componentDidMount() {
        if (this.props.apiKey) {
            this.fetchRepos();
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.apiKey !== this.props.apiKey) {
            if (this.props.apiKey) {
                this.fetchRepos();
            }
        }
    }

    selectRepo(index) {
        this.setState({ selectedRepo: index });
        this.setRepoAccordion(false);
    }

    setRepoAccordion(state) {
        this.setState({ repoAccordionOpen: state });
    }

    toggleRepoAccordion() {
        this.setState({ repoAccordionOpen: !this.state.repoAccordionOpen });
    }

    renderRepoList() {
        const repoList = this.state.repos.map((repo, index) => (
            <li key={index}>
                <p>
                    <SelectRepoButton 
                        buttonText={repo.name} 
                        handleClick={() => this.selectRepo(index)}
                        className={`btn btn--link ${this.state.selectedRepo === index? 'repo-selected' : ''}`}
                        icon={<SmallArrow className={this.state.selectedRepo === index ? 'close' : ''}></SmallArrow>}
                        iconOnRight
                    />
                </p>
            </li>
        ));

        return <RepoList>{repoList}</RepoList>;
    }

	render() {
        if (!this.state.reposLoaded) {
            return <LoadingSpinner />;
        }

        if (this.state.reposLoaded && this.state.repos && this.state.repos.length) {
            return (
                <ListingContainer>
                    <Row>
                        <ColA>
                            <Row>
                                <FullWidthCol>
                                    <h2>
                                        <RepoToggle 
                                            handleClick={this.toggleRepoAccordion}  
                                            buttonText="Select a Repo"
                                            iconOnRight
                                            className="btn btn--link"
                                            icon={<SmallArrow className={this.state.repoAccordionOpen ? 'open' : 'close'} color={theme.black} width="7px"></SmallArrow>}
                                            color={theme.black}
                                        />
                                    </h2>
                                </FullWidthCol>
                            </Row>
                            <Row>
                                <RepoAccordion className={this.state.repoAccordionOpen ? 'slidedown' : 'slideup'}>
                                    {this.renderRepoList()}
                                </RepoAccordion>
                            </Row>
                        </ColA>
                        <ColB>
                            <IssueListing 
                                className={this.state.repos && this.state.repos[this.state.selectedRepo] ? 'repo-selected' : 'no-repo-selected'}
                                selectedRepo={this.state.repos && this.state.repos[this.state.selectedRepo]}
                            />
                        </ColB>
                    </Row>
                </ListingContainer>
            );
        }

        return <SaveKey fieldError={this.state.fieldError} />;
	}
}

Listing.defaultProps = {
    selectedRepo: null
};
