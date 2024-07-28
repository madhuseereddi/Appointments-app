import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    isFav: false,
    isStar: false,
    appointmentsList: [],
    originalList: [],
  }

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getTheDate = event => {
    this.setState({date: event.target.value})
  }

  isFavClicked = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFav: !eachItem.isFav}
        }
        return eachItem
      }),
      originalList: prevState.originalList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFav: !eachItem.isFav}
        }
        return eachItem
      }),
    }))
  }

  getStarred = () => {
    const {appointmentsList, isFav, originalList} = this.state
    let filteredList

    if (!isFav) {
      filteredList = appointmentsList.filter(eachItem => eachItem.isFav)
    } else {
      filteredList = originalList
    }

    this.setState(prevState => ({
      isFav: !prevState.isFav,
      appointmentsList: filteredList,
    }))
  }

  buttonSubmit = event => {
    event.preventDefault()
    const {title, date, isFav, appointmentsList, originalList} = this.state
    const appointmentObj = {
      id: uuidv4(),
      title,
      date,
      isFav,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, appointmentObj],
      originalList: [...prevState.originalList, appointmentObj],
      title: '',
      date: '',
    }))
  }

  render() {
    const {appointmentsList, title, date} = this.state
    return (
      <form onSubmit={this.buttonSubmit}>
        <div className="full-bg">
          <div className="card">
            <div className="inner">
              <div className="inner1">
                <h1>Add Appointment</h1>
                <label htmlFor="title" className="titleLabel">
                  Title
                </label>
                <input
                  type="text"
                  className="title"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.getTitle}
                />
                <label htmlFor="date" className="titleLabel">
                  Date
                </label>
                <input
                  type="date"
                  className="title"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  onChange={this.getTheDate}
                />
                <button className="btn1" type="submit">
                  Add
                </button>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="img1"
              />
            </div>
            <hr className="hr" />
            <div className="newdiv1">
              <div className="newdiv">
                <h1 className="head1">Appointments</h1>
                <button
                  className="btn2"
                  onClick={this.getStarred}
                  type="button"
                >
                  Starred
                </button>
              </div>
              <ul className="ul">
                {appointmentsList.map(eachItem => (
                  <AppointmentItem
                    eachItem={eachItem}
                    key={eachItem.id}
                    isFavClicked={this.isFavClicked}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default Appointments
