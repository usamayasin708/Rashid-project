import React from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import Home from "./containers/Home";
import { HashRouter } from "react-router-dom";
import Edit from "./containers/Edit";
import AddPage from "./containers/AddPage";
import ShowAddPage from "./containers/ShowAddPage";
import EditContent from "./containers/EditContent";
import ShowData from "./ShowData";
import CoursesAvailble from "./containers/CoursesAvailble";
import LearnerShowPages from "./containers/LearnerShowPages";
import Dashboard from "./containers/Dashboard"
import ProtectedRoute from "./Routing/ProtectedRoute"

export default function Routes() {
    const history = useHistory();
    return (
        <BrowserRouter history={history}>
            <Route exact path="/home">
                <Home />
            </Route>

            {/* Tutor Routes */}
            <ProtectedRoute exact path="/addpage" component={AddPage} role={'tutor'}></ProtectedRoute>
            <ProtectedRoute exact path="/edit/:id" component={Edit} role={'tutor'}></ProtectedRoute>
            <ProtectedRoute exact path="/showaddpage" component={ShowAddPage} role={'tutor'}></ProtectedRoute>
            <ProtectedRoute exact path="/showdata/:id" component={ShowData} role={'tutor'}></ProtectedRoute>
            <ProtectedRoute exact path="/editContent/:id" component={EditContent} role={'tutor'}></ProtectedRoute>

            {/* Learner ProtectedRoutes */}
            <ProtectedRoute exact path="/coursesavailble" component={CoursesAvailble} role={'learner'}></ProtectedRoute>
            <ProtectedRoute exact path="/learnershowpages/:id" component={LearnerShowPages} role={'learner'}></ProtectedRoute>
            <Route exact path="/:id/:title" component={Dashboard} role={'tutor'}></Route>
        </BrowserRouter>
    );
}