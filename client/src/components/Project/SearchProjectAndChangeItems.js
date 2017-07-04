import React, {Component} from 'react';

export default class SearchProjectAndChangeItems extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente"><h1>Search Projects</h1></div>
                <div className="panel-body">

                    <form action="/searchProjects" method="post">
                        <div className="form-group">
                            <label htmlFor="projectCode">Project Code:</label>
                            <input type="text" className="form-control" id="projectCode" name="projectCode"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="projectName">Name:</label>
                            <input type="text" className="form-control" id="projectTitle" name="projectTitle"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="changeItemTitle">Change Item Name:</label>
                            <input type="text" className="form-control" id="changeItemTitle" name="changeItemTitle"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="changeItemStatus">Change Item Status:</label>
                            <select className="form-control" id="changeItemStatus" name="changeItemStatus">
                                <option value="">Any</option>
                                <option value="New">New</option>
                                <option value="Impacting">Impacting</option>
                                <option value="Impacted">Impacted</option>
                                <option value="Returned">Returned</option>
                                <option value="Approved">Approved</option>
                                <option value="Closed">Closed</option>
                                <option value="Withdrawn">Withdrawn</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Provisional">Provisional</option>
                                <option value="On-Hold">On-Hold</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                        <input type="submit" value="Search Projects" className="btn btn-success btn-lg btn-block"/>
                    </form>
                </div>
            </div>
        )
    }
}