import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    newItemList: [],
    optionId: languageFiltersData[0].id,
    updatingStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getAllLanguages()
  }

  getAllLanguages = async () => {
    this.setState({updatingStatus: apiStatus.loading})
    const {optionId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${optionId}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachdata => ({
        avatarUrl: eachdata.avatar_url,
        forksCount: eachdata.forks_count,
        id: eachdata.id,
        issuesCount: eachdata.issues_count,
        name: eachdata.name,
        starsCount: eachdata.stars_count,
      }))
      this.setState({
        newItemList: updatedData,
        updatingStatus: apiStatus.success,
      })
    } else {
      this.setState({updatingStatus: apiStatus.failure})
    }
  }

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccesView = () => {
    const {newItemList} = this.state

    return (
      <ul className="unOrderedList">
        {newItemList.map(item => (
          <RepositoryItem eachItem={item} key={item.id} />
        ))}
      </ul>
    )
  }

  containerView = () => {
    const {updatingStatus} = this.state

    switch (updatingStatus) {
      case apiStatus.success:
        return this.renderSuccesView()
      case apiStatus.failure:
        return this.failureView()
      case apiStatus.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  onChangeButton = optionId => {
    this.setState({optionId}, this.getAllLanguages)
  }

  render() {
    const {optionId} = this.state

    return (
      <div className="container">
        <h1 className="popular-name">Popular</h1>
        <ul className="unOrdered-language-list">
          {languageFiltersData.map(languages => (
            <LanguageFilterItem
              eachLanguage={languages}
              key={languages.id}
              onChangeButton={this.onChangeButton}
              ActiveId={languages.id === optionId}
            />
          ))}
        </ul>
        {this.containerView()}
      </div>
    )
  }
}

export default GithubPopularRepos
