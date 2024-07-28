import './index.css'
import {format, parseISO} from 'date-fns'

const AppointmentItem = props => {
  const {eachItem, isFavClicked} = props
  const {title, date, id, isFav} = eachItem

  const formattedDate = format(parseISO(date), 'dd MMMM yyyy, EEEE')
  const isClicked = () => {
    isFavClicked(id)
  }

  return (
    <li>
      <div className="full-card">
        <div className="card1">
          <p className="para2">{title}</p>
          <button
            data-testid="star"
            onClick={isClicked}
            type="button"
            className="star-button"
          >
            <img
              src={
                isFav
                  ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
              }
              alt="star"
              className="img2"
            />
          </button>
        </div>
        <p className="para3">{formattedDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
