import React, {useState} from "react";
import "./App.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import {Button} from "react-bootstrap";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FormData, choiceYesNo, choiceGender} from "./Data/FormData";

const App = () => {
    const [isLoading, setLoading] = useState(false);
    const [result, setResults] = useState(null)
    const [formData, setFormData] = useState({
        // "name": null,
        "gender": null,
        "age": null,
        "smoking": null,
        "yellow_fingers": null,
        "anxiety": null,
        "peer_pressure": null,
        "chronic_disease": null,
        "fatigue": null,
        "allergy": null,
        "wheezing": null,
        "alcohol": null,
        "coughing": null,
        "shortness_of_breath": null,
        "swallowing_difficulty": null,
        "chest_pain": null,
    })
    const toastProps = {
        default: {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        },
    };
    const MapGrid = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0, n));
        return chunks;
    };

    const HandleForm = (evt, item) => {
        setFormData({...formData, [item]: evt})
    }

    const HandleFormSubmission = async () => {
        const URL = "http://127.0.0.1:8000/api/detect-lung-cancer";

        console.log(formData)

        if (IsEmpty()) {
            toast.error("Fields cant be empty!", toastProps.default)
            return
        }

        setLoading(true);
        const pending = toast.loading("Analyzing data", toastProps.default);

        await axios
            .post(URL, {"user_properties": formData}, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => result.data)
            .then((data) => {
                setResults(data)
                console.log(data);
                setLoading(false);
                toast.update(pending, {
                    render: "Success 👌",
                    type: "success",
                    isLoading: false,
                    autoClose: 5000,
                });
            })
            .catch((error) => {
                setLoading(false);
                toast.update(pending, {
                    render: error.message,
                    type: "error",
                    autoClose: 5000,
                    isLoading: false,
                });
                console.error("Error:", error);
            });

        // toast.dismiss();
    }

    const IsEmpty = () => {
        for (const obj of Object.keys(formData)) {
            if (formData[obj] === null || formData[obj] === "") {
                return true
            }
        }
        return false
    }

    const MapToChoice = (id, type) => {
        if (id === "gender") {
            return (choiceGender.find(e => e.value === type)).name
        } else if (id === "age") {
            return formData[id]
        } else {
            return (choiceYesNo.find(e => e.value === type)).name
        }
    }

    const RenderDropdownToggleName = (item) => {
        return formData[item.id] !== null ? MapToChoice(item.id, formData[item.id]) : `Select ${item.name}`
    }

    const resetPage = () => {
        window.location.reload(false);
    };

    const RenderGrid = () => {
        return (
            MapGrid(FormData.items, 2).map((row, i) => (
                <Row key={i}>
                    {row.map((col, i) => (
                        <Col key={i}>
                            <Form.Group className="mb-3">
                                <Form.Label>{col.name}</Form.Label>
                                <Dropdown
                                    key={i}
                                    id={`dropdown-${i}`}
                                    onSelect={eventKey => HandleForm(parseInt(eventKey), col.id)}
                                >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        {RenderDropdownToggleName(col)}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            col.dropdown_items.map((item, i) => (
                                                <Dropdown.Item
                                                    eventKey={item.value}
                                                    key={i}
                                                    id={`dropdown-item-${i}`}
                                                >
                                                    {item.name}
                                                </Dropdown.Item>
                                            ))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
            )))
    };

    return (
        <>
            <ToastContainer/>
            <Container className="mt-5 mb-5 d-flex justify-content-center align-content-center">
                {isLoading ? (<Spinner animation="grow"/>) : (
                    <Card className="px-1 py-4">
                        <Card.Body>
                            {result ? (
                                <>
                                    <Card.Title>{`You have Lung cancer : ${result.predicted_class}`}</Card.Title>
                                    <Button variant="primary" onClick={resetPage}>
                                        Restart
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Card.Title className="text-center">Lung cancer predicting model</Card.Title>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control onChange={(e) => {
                                                // HandleForm(e.target.value, "name")
                                            }} placeholder="Name"/>
                                        </Form.Group>
                                        <RenderGrid/>
                                    </Form>
                                    <Button variant="primary" onClick={HandleFormSubmission}>
                                        Submit
                                    </Button>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </>
    );
};

export default App;
