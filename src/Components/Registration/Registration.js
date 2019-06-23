import React from "react";
import "./Registration.css";
import Input, { inputTypes } from "./Input/Input";
import Option from "./Option/Option";

class Registration extends React.Component {
    state = {
        form: {
            username: {
                label: "Username",
                name: "username",
                type: "text",
                value: "",
                instructions: "Instructions to show on input focus.",
                required: true
            },
            name: {
                label: "Name",
                name: "name",
                type: "text",
                value: "",
                instructions: "Instructions to show on input focus.",
                required: true
            },
            email: {
                label: "Email",
                name: "email",
                type: "email",
                value: "",
                instructions: "Instructions to show on input focus.",
                required: true
            },
            city: {
                label: "City",
                name: "city",
                type: "text",
                value: "",
                instructions: "Instructions to show on input focus."
            },
            rideInGroup: {
                label: "Ride in group?",
                name: "rideInGroup",
                type: "radio",
                options: [
                    { value: "Aways", selected: true },
                    { value: "Sometimes", selected: false },
                    { value: "Never", selected: false }
                ]
            },
            daysOfTheWeek: {
                label: "Days of the week",
                name: "daysOfTheWeek",
                type: "checkbox",
                options: [
                    { value: "Sun", selected: false },
                    { value: "Mon", selected: false },
                    { value: "Tue", selected: false },
                    { value: "Wed", selected: false },
                    { value: "Thu", selected: false },
                    { value: "Fri", selected: false },
                    { value: "Sat", selected: false }
                ]
            }
        }
    }

    onInputChange = (value, name) => {
        const form = { ...this.state.form };
        form[name].value = value;

        this.setState({ form: form });
    }

    onRadioChange = (option, name) => {
        const form = { ...this.state.form };

        form[name].options.forEach(opt => opt.selected = opt.value === option);

        this.setState({ form: form });
    }

    onCheckboxChange = (option, name) => {
        const form = { ...this.state.form };

        const changedOption = form[name].options.find(opt => opt.value === option);
        changedOption.selected = !changedOption.selected;

        this.setState({ form: form });
    }

    isFormValid = () => {
        const form = { ...this.state.form };

        let isValid = true;
        Object.keys(form).forEach(key => {
            if (inputTypes.includes(form[key].type) && form[key].required) {
                isValid = isValid && form[key].value;
            }
        });

        return isValid;
    }

    clearFields = () => {
        const form = { ...this.state.form };

        form.username.value = "";
        form.name.value = "";
        form.email.value = "";
        form.city.value = "";

        form.rideInGroup.options.forEach(option => option.selected = false);
        form.rideInGroup.options[0].selected = true;

        form.daysOfTheWeek.options.forEach(option => option.selected = false);

        this.setState({ form });
    }

    exclude = (arr, days) => {
        days.forEach(day => {
            const dayIndex = arr.findIndex(option => option === day);
            arr.splice(dayIndex, 1);
        });
    }

    hasDays = (arr, days) => {
        let has = true;
        days.forEach(day => has = arr.includes(day) && has);

        return has;
    }

    mapDaysOfTheWeek = () => {
        const mappedDays = [];

        const selectedDays = this.state.form.daysOfTheWeek.options.filter(option => option.selected)
            .map(option => option.value);

        if (selectedDays.length === 0) {
            return ["None"];
        }

        if (this.hasDays(selectedDays, ["Sat", "Sun"])) {
            this.exclude(selectedDays, ["Sat", "Sun"]);
            mappedDays.push("Weekends");
        }

        if (this.hasDays(selectedDays, ["Mon", "Tue", "Wed", "Thu", "Fri"])) {
            this.exclude(selectedDays, ["Mon", "Tue", "Wed", "Thu", "Fri"]);
            mappedDays.push("Week days");
        }

        if (this.hasDays(mappedDays, ["Weekends", "Week days"])) {
            this.exclude(mappedDays, ["Weekends", "Week days"]);
            mappedDays.push("Every day");
        }

        selectedDays.forEach(day => mappedDays.push(day));

        return mappedDays.join(", ");
    }

    onSave = event => {
        event.preventDefault();

        if (this.isFormValid()) {
            const form = { ...this.state.form };

            const selectedRadio = form.rideInGroup.options.find(option => option.selected).value

            const user = {
                username: form.username.value,
                name: form.name.value,
                email: form.email.value,
                address: { city: form.city.value },
                rideInGroup: selectedRadio,
                dayOfTheWeek: this.mapDaysOfTheWeek()
            }

            this.props.addUser(user);

            this.clearFields();
        }
    }

    render() {
        return (
            <div className="Registration">
                <div className="Registration-Header">
                    <div className="Registration-Title">
                        <h1>Registration</h1>
                    </div>
                    <div className="Registration-Divider" />
                </div>
                <div className="Registration-Form">
                    <form>
                        <div className="Registration-Container">
                            <div>
                                <Input {...this.state.form.username} change={this.onInputChange} />
                                <Input {...this.state.form.name} change={this.onInputChange} />
                                <Input {...this.state.form.email} change={this.onInputChange} />
                            </div>
                            <div>
                                <Input {...this.state.form.city} change={this.onInputChange} />
                                <Option {...this.state.form.rideInGroup} change={this.onRadioChange} />
                                <Option {...this.state.form.daysOfTheWeek} change={this.onCheckboxChange} />
                            </div>
                        </div>
                        <div className="Registration-Actions">
                            <button className="Save Background-Primary" onClick={this.onSave} type="submit">Save</button>
                            <button className="Discard" type="button" onClick={this.clearFields}>Discard</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Registration;