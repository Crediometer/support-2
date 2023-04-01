import { useContext } from 'react'
import DashboardContext from '../contexts/DashboardContext'

const useDashboard = () => useContext(DashboardContext)

export default useDashboard;
