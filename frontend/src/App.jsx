import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard Routes */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskDetail />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
