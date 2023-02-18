import {Routes,Route} from 'react-router-dom'
import HomePage from '../components/home/Home'
import SearchPage from '../components/search/Search'
import DetailsPage from '../components/details/Details'



function AppRoutes(){
    return (
        <Routes>
            <Route path = "/" element = {<HomePage/>}></Route>
            <Route path = "/citysearch" element = {<SearchPage/>}></Route>
            <Route path = "/details/:cityname" element = {<DetailsPage/>}></Route>

        </Routes>
    )
}
export default AppRoutes