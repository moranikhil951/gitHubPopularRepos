// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, ActiveId, onChangeButton} = props

  const {id, language} = eachLanguage

  const className = ActiveId ? 'styling-button' : 'normal-button'

  const onClickChange = () => {
    onChangeButton(id)
    console.log(id)
  }

  return (
    <li className="language-button-con">
      <button className={className} type="button" onClick={onClickChange}>
        <p className="language">{language}</p>
      </button>
    </li>
  )
}
export default LanguageFilterItem
