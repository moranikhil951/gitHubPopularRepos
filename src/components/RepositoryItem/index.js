// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = eachItem
  return (
    <li className="listed-items">
      <img className="avatarUrl" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div className="flex-con">
        <div className="flex">
          <img
            className="icons"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="flex">
          <img
            className="icons"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="flex">
          <img
            className="icons"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
