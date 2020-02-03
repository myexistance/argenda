import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody,  MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol} from "mdbreact";
import "./index.css";
import Diary from "./img/diary.jpg"  ;





class App extends Component {
      constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
        modal: false,
        events: [
        {
            id: 1,
            time: "10:00",
            title: "Breakfast with Simon",
            location: "Lounge Caffe",
            description: "Discuss Q3 targets"
        },
        {
            id: 2,
            time: "10:30",
            title: "Daily Standup Meeting (recurring)",
            location: "Warsaw Spire Office"
        },
        { id: 3, time: "11:00", title: "Call with HRs" },
        {
            id: 4,
            time: "12:00",
            title: "Lunch with Timmoty",
            location: "Canteen",
            description:
            "Open next funding"
        }
        ]
    };
    }
    addEvent = () => {
    var newArray = [...this.state.events];
    newArray.push({
        id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
        time: this.state.time,
        title: this.state.title,
        location: this.state.location,
        description: this.state.description
    });
    this.setState({ events: newArray });
    this.setState({
        time: "",
        title: "",
        location: "",
        description: ""
    });
    };
    handleInputChange = inputName => value => {
    const nextValue = value;
    this.setState({
        [inputName]: nextValue
    });
    };
    handleDelete = eventId => {
    const events = this.state.events.filter(e => e.id !== eventId);
    this.setState({ events });
    };
    toggleModal = () => {
    this.setState({
        modal: !this.state.modal
    });
    };



    render() {
    return (
        <React.Fragment>
        <MDBContainer>
            <MDBRow>
            <MDBCol md="8" >
                <h2 className="text-uppercase my-3">Today: {this.state.date.toLocaleDateString()} </h2>

                <div id="events">
                {this.state.events.map(event => (
                    <Event
                    key={event.id}
                    id={event.id}
                    time={event.time}
                    title={event.title}
                    location={event.location}
                    description={event.description}
                    onDelete={this.handleDelete}
                    />
                ))}
                </div>
                <MDBRow className="mb-4">
                <MDBCol xl="3" md="6" className="mx-auto text-center">
                    <MDBBtn color="elegant" rounded onClick={this.toggleModal}>
                    Add Event
                    </MDBBtn>
                </MDBCol>
                </MDBRow>
            </MDBCol>
            <MDBCol md="4" className="mb-r">


                <h4 className="my-3">
                You have{" "}
                <b>{this.state.events.length} events </b> today.
                </h4>

                <img src={Diary} rounded className="img-fluid" alt="diaryimage"/>

            </MDBCol>

            </MDBRow>
        </MDBContainer>
        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
            <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
            >
            Add new event
            </MDBModalHeader>
            <MDBModalBody>
                <form className="mx-3 grey-text">
                    <MDBInput
                      name="time"
                      label="Time"
                      icon="clock"
                      hint="12:00"
                      group
                      type="text"
                      getValue={this.handleInputChange("time")}
                    />
                    <MDBInput
                      name="title"
                      label="Title"
                      icon="edit"
                      hint="Briefing"
                      group
                      type="text"
                      getValue={this.handleInputChange("title")}
                    />
                    <MDBInput
                      name="location"
                      label="Location (optional)"
                      icon="map"
                      group
                      type="text"
                      getValue={this.handleInputChange("location")}
                    />
                    <MDBInput
                      name="description"
                      label="Description (optional)"
                      icon="sticky-note"
                      group
                      type="textarea"
                      getValue={this.handleInputChange("description")}
                    />
                  </form>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
            <MDBBtn
                color="elegant"
                onClick={() => {
                this.toggleModal();
                this.addEvent();
                }}
            >
                Add
            </MDBBtn>
            </MDBModalFooter>
        </MDBModal>
        </React.Fragment>
    );
    }
}
class Event extends Component {
    render() {
    return (
        <React.Fragment>
        <div className="media mt-1">
            <h3 className="h3-responsive font-weight-bold mr-3">
            {this.props.time}
            </h3>
            <div className="media-body mb-3 mb-lg-3">
            <MDBBadge
                color="danger"
                className="ml-2 float-right"
                onClick={() => this.props.onDelete(this.props.id)}
            >
                -
            </MDBBadge>
            <h6 className="mt-0 font-weight-bold">{this.props.title} </h6>{" "}
            <hr className="hr-bold my-2" />
            {this.props.location && (
                <React.Fragment>
                <p className="font-smaller mb-0">
                    <MDBIcon icon="location-arrow" /> {this.props.location}
                </p>
                </React.Fragment>
            )}
            </div>
        </div>
        {this.props.description && (
            <p className="p-2 mb-4  blue-grey lighten-5 lighten-5">
            {this.props.description}
            </p>
        )}
        </React.Fragment>
    );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
