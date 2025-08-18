import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./context/AuthContext";
import FilterComponent from "./components/Filter/DateHoursFilter";
import LiveCameraWall from "./pages/LiveCameraWall";
import AnomalyDetectionAlerts from "./pages/AnomalyDetectionAlerts";
import UnrecognizedFaceLog from "./pages/UnrecognizedFaceLog";
import VisitorFaceMatchFailures from "./pages/VisitorFaceMatchFailures";
import Visits from "./pages/Visits";
import DeniedAccess from "./pages/DeniedAccess";
import BlacklistedWalkin from "./pages/BlacklistedWalkin";
import RejectedIDProof from "./pages/RejectedIDProof";
import HostSLABreach from "./pages/HostSLABreach";
import FrequentVisitorWatchlist from "./pages/FrequentVisitorWatchlist";
import LiveAccessLogs from "./pages/LiveAccessLogs";
import BlockedEntryAttempts from "./pages/BlockedEntryAttempts";
import AccessPointsStatus from "./pages/AccessPointsStatus";
import OverstayViolationTracker from "./pages/OverstayViolationTracker";
import VehicleEntryLogs from "./pages/VehicleEntryLogs";
import GuardDutyRoster from "./pages/GuardDutyRoster";
import LiveGuardStatusMap from "./pages/LiveGuardStatusMap";
import PatrolSchedulePlanner from "./pages/PatrolSchedulePlanner";
import MissedOrDelayedPatrols from "./pages/MissedOrDelayedPatrols";
import GuardInitiatedEscalations from "./pages/GuardInitiatedEscalations";
import GuardDeviceHealthMonitor from "./pages/GuardDeviceHealthMonitor";
import LocationSetup from "./pages/LocationSetup";
import DeskAssignmentStatus from "./pages/DeskAssignmentStatus";
import VisitorLoadBalancing from "./pages/VisitorLoadBalancing";
import UnitAccessProfiles from "./pages/UnitAccessProfiles";
import VisitorRiskProfile from "./pages/VisitorRiskProfile";
import LiveAlertsDashboard from "./pages/LiveAlertsDashboard";
import AlertTypesBySource from "./pages/AlertTypesBySource";
import OverstayAlerts from "./pages/OverstayAlerts";
import EscalationLog from "./pages/EscalationLog";
import ResponseSLAClosureTimes from "./pages/ResponseSLAClosureTimes";
import FalseAlertFeedback from "./pages/FalseAlertFeedback";
import Flooreplan from "./components/FloorePlan/FloorPlanEditor";
import UnitFilter from "./components/MoreFilters/UnitFilter/UnitFilter";
import "./App.css";
import PropertyFilter from "./components/MoreFilters/PropertyFilter/PropertyFilter";
import DeskFilter from "./components/MoreFilters/DeskFilter/DeskFilter";
import StatusFilter from "./components/MoreFilters/StatusFilter/StatusFilter";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="loginForm">
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      <div className="flex-grow-1 main-content">
        <Header onSidebarToggle={() => setShowSidebar(true)} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/FilterComponent" element={<FilterComponent />} />
            {/* Video Intelligence Routes */}
            <Route
              path="/videointelligence/livecamerawall"
              element={<LiveCameraWall />}
            />
            <Route
              path="/videointelligence/anomalydetectionalerts"
              element={<AnomalyDetectionAlerts />}
            />
            <Route
              path="/videointelligence/unrecognizedfacelog"
              element={<UnrecognizedFaceLog />}
            />
            <Route
              path="/videointelligence/visitorfacematchfailures"
              element={<VisitorFaceMatchFailures />}
            />
            {/* Visitor Management Routes */}
            <Route path="/visitormanagement/visits" element={<Visits />} />
            <Route
              path="/visitormanagement/deniedaccess"
              element={<DeniedAccess />}
            />
            <Route
              path="/visitormanagement/blacklistedwalk-in"
              element={<BlacklistedWalkin />}
            />
            <Route
              path="/visitormanagement/rejectedIDproof"
              element={<RejectedIDProof />}
            />
            <Route
              path="/visitormanagement/hostSLAbreach"
              element={<HostSLABreach />}
            />
            <Route
              path="/visitormanagement/frequentvisitorwatchlist"
              element={<FrequentVisitorWatchlist />}
            />
            {/* Access Control Routes */}
            <Route
              path="/accesscontrol/liveaccesslogs"
              element={<LiveAccessLogs />}
            />
            <Route
              path="/accesscontrol/blockedentryattempts"
              element={<BlockedEntryAttempts />}
            />
            <Route
              path="/accesscontrol/accesspointsstatus"
              element={<AccessPointsStatus />}
            />
            <Route
              path="/accesscontrol/overstayviolationtracker"
              element={<OverstayViolationTracker />}
            />
            <Route
              path="/accesscontrol/vehicleentrylogs"
              element={<VehicleEntryLogs />}
            />
            {/* Guards and Patrols Routes */}
            <Route
              path="/guardsandpatrols/guarddutyroster"
              element={<GuardDutyRoster />}
            />
            <Route
              path="/guardsandpatrols/liveguardstatusmap"
              element={<LiveGuardStatusMap />}
            />
            <Route
              path="/guardsandpatrols/patrolscheduleplanner"
              element={<PatrolSchedulePlanner />}
            />
            <Route
              path="/guardsandpatrols/missedordelayedpatrols"
              element={<MissedOrDelayedPatrols />}
            />
            <Route
              path="/guardsandpatrols/guard-Initiatedescalations"
              element={<GuardInitiatedEscalations />}
            />
            <Route
              path="/guardsandpatrols/guarddevicehealthmonitor"
              element={<GuardDeviceHealthMonitor />}
            />
            {/* Locations and Desks Routes */}
            <Route
              path="/locationsanddesks/locationsetup"
              element={<LocationSetup />}
            />
            <Route
              path="/locationsanddesks/deskassignment&status"
              element={<DeskAssignmentStatus />}
            />
            <Route
              path="/locationsanddesks/visitorloadbalancingbydesk"
              element={<VisitorLoadBalancing />}
            />
            <Route
              path="/locationsanddesks/unit-levelaccesscontrolprofiles"
              element={<UnitAccessProfiles />}
            />
            <Route
              path="/locationsanddesks/location-wisevisitorriskprofile"
              element={<VisitorRiskProfile />}
            />
            {/* Incidents and Alerts Routes */}
            <Route
              path="/incidentsandalerts/livealertsdashboard"
              element={<LiveAlertsDashboard />}
            />
            <Route
              path="/incidentsandalerts/alerttypesbysource"
              element={<AlertTypesBySource />}
            />
            <Route
              path="/incidentsandalerts/overstayviolationalerts"
              element={<OverstayAlerts />}
            />
            <Route
              path="/incidentsandalerts/visitorescalationlog"
              element={<EscalationLog />}
            />
            <Route
              path="/incidentsandalerts/responseSLA&closuretimes"
              element={<ResponseSLAClosureTimes />}
            />
            <Route
              path="/incidentsandalerts/falsealertfeedbackloop"
              element={<FalseAlertFeedback />}
            />
            <Route path="/FloorePlan" element={<Flooreplan />} />
            <Route path="/UnitFilter" element={<UnitFilter />} />
            <Route path="/PropertyFilter" element={<PropertyFilter />} />
            <Route path="/DeskFilter" element={<DeskFilter />} />
            <Route path="/StatusFilter" element={<StatusFilter />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
