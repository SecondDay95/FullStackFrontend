import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteProjectTask} from "../../actions/projectTaskActons";


class ProjectTaskItem extends Component {

    onDeleteClick (pt_id) {
        this.props.deleteProjectTask(pt_id);
    }

    render() {
        const {project_task} = this.props;
        return (
            <div className="card mb-1 bg-light">

            <div className="card-header text-primary">
                ID: {project_task.id}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">Project name: {project_task.name}</h5>
                <p className="card-text text-truncate ">
                    Project description: {project_task.description}
                </p>
                <p className="card-text text-truncate ">
                    Employee name: {project_task.employee}
                </p>
                <p className="card-text text-truncate ">
                    Hours: {project_task.hours}
                </p>
                <Link to={`updateProjectTask/${project_task.id}`} className="btn btn-primary">
                    View / Update
                </Link>

                <button className="btn btn-danger ml-4"
                onClick = {this.onDeleteClick.bind(this, project_task.id)}>
                    Delete
                </button>
            </div>
        </div>
        )
    }
}

ProjectTaskItem.propTypes = {
    deleteProjectTask:PropTypes.func.isRequired
};

export default connect(null, {deleteProjectTask}) (ProjectTaskItem);
