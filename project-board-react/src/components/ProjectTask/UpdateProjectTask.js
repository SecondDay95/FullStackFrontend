import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {getProjectTask, addProjectTask} from "../../actions/projectTaskActons";

class UpdateProjectTask extends Component {

constructor() {
    super();
    this.state = {
        id: "",
        name: "",
        description: "",
        employee: "",
        hours: "",
        status: "",
        errors: {}
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
}

onChange(e) {
    this.setState({[e.target.name]:e.target.value});
}

componentWillReceiveProps (nextProps) {

    if (nextProps.errors) {
        this.setState({errors : nextProps.errors});
    }

    const{id, name, description, employee, hours, status} = nextProps.project_task;

    this.setState({
        id, name, description, employee, hours, status
    });
}

    componentDidMount() {
        const{pt_id} = this.props.match.params;
        this.props.getProjectTask(pt_id);
    }

    onSubmit(e) {
        e.preventDefault() 
        const updatedTask = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            employee: this.state.employee,
            hours: this.state.hours,
            status: this.state.status
        };
        this.props.addProjectTask(updatedTask, this.props.history);
    }

    render() {
        const{errors} = this.state;
        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <a href="/projectBoard" className="btn btn-light">
                                Back to Board
                            </a>
                            <h4 className="display-4 text-center">Add /Update Project</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                     className={classnames("form-control form-control-lg",{
                                        "is-invalid":errors.name
                                     })} 
                                     name="name" 
                                     placeholder="Project name"
                                     value={this.state.name} 
                                     onChange={this.onChange}/>
                                     {
                                         errors.name && (
                                             <div className="invalid-feedback">{errors.name}</div>
                                         )
                                     }
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                     className={classnames("form-control form-control-lg",{
                                        "is-invalid":errors.description
                                     })} 
                                     name="description" 
                                     placeholder="Project description"
                                     value={this.state.description} 
                                     onChange={this.onChange}/>
                                     {
                                         errors.description && (
                                             <div className="invalid-feedback">{errors.description}</div>
                                         )
                                     }
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                     className={classnames("form-control form-control-lg",{
                                        "is-invalid":errors.employee
                                     })} 
                                     name="employee" 
                                     placeholder="Employee name"
                                     value={this.state.employee} 
                                     onChange={this.onChange}/>
                                     {
                                         errors.employee && (
                                             <div className="invalid-feedback">{errors.employee}</div>
                                         )
                                     }
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                     className={classnames("form-control form-control-lg",{
                                        "is-invalid":errors.hours
                                     })} 
                                     name="hours" 
                                     placeholder="Number of hours"
                                     value={this.state.hours} 
                                     onChange={this.onChange}/>
                                     {
                                         errors.hours && (
                                             <div className="invalid-feedback">{errors.hours}</div>
                                         )
                                     }
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg"
                                     name="status"
                                     value={this.state.status}
                                     onChange={this.onChange}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-dark btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProjectTask.propTypes = {
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    addProjectTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project_task: state.project_task.project_task,
    errors: state.errors
});

export default connect (mapStateToProps, {getProjectTask, addProjectTask}) (UpdateProjectTask);
