import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import * as actions from './_actions/data.action'
import Header from './sections/header/container/Header'
import Main from './pages/home/component/Main'
import Home from './pages/home/container/Home';
import Footer from './sections/footer/container/Footer';
import TopBar from './sections/header/component/TopBar'
import TopBarItem from './sections/header/component/TopBarItem'
import TopBarLogo from './sections/header/component/TopBarLogo'
import FooterLayout from './sections/footer/component/FooterLayout'
import FooterBox from './sections/footer/component/FooterBox'
import Search from './widgets/search/component/Search'
import Icon from './widgets/icon/Icon';
import Products from './pages/products/container/Products';
import Item from './sections/item/container/Item'
import SignUp from './sections/forms/containers/SignUp'
import SignIn from './sections/forms/containers/SignIn'

class App extends Component {

  componentDidMount(){
    this.props.actions.departments()
  }

  render() {
    const {isLoading, loggedIn} = this.props
    // console.log(departments)
    return (
      <Router>        
        { 
          !isLoading ? 
        <div className="App">
          <Header>
              <TopBar>
                  <TopBarLogo />    
                  {department ?
                      department.map(item => (
                        <TopBarItem key={item.id}>
                          <NavLink activeStyle={{
                            textDecoration : 'none',
                            color : 'red'
                          }} to={`/g/${item.name}`}>
                              {item.name || 'no_description'}
                          </NavLink>
                          </TopBarItem>                
                      )) : <div>Loading...</div> 
                  }
                  <Search />
                  <TopBarItem>
                      <Icon iconName='icon-bag' />
                  </TopBarItem>
              </TopBar>
          </Header>
          <Main>
            <Route exact={true} path='/' render={()=>(
              <Home />
              )} />
            <Route exact={true} path='/register' render={()=>(
              <SignUp />
              )} />
            <Route exact={true} path='/login' render={()=>(
              localStorage.getItem('user') ? (
                <Redirect to="/"/>
              ) : (
                <SignIn />
              )
              )} />
            <Route exact={true} path='/products' render={()=>(
              <Products />
              )} />
            <Route exact={true} path='/products/:id' render={()=>(
               <Item />
             )} />
            <Route path={`/g/:id`} render={Test} />
            <Route path={`/help`} render={Test} />
            <Route path={`/track-order`} render={Test} />
            <Route path={`/returns`} render={Test} />
          </Main>
          <Footer>
            <FooterLayout>
              <FooterBox>
                <h3>QUESTIONS?</h3>
                <NavLink to='/help'>Help</NavLink>
                <NavLink to='/track-order'>Track Order</NavLink>
                <NavLink to='/returns'>Returns</NavLink>
              </FooterBox>
              <FooterBox>
                <h3>WHAT'S IN STORE?</h3>
                <NavLink to='/women'>Women</NavLink>
                <NavLink to='/men'>Men</NavLink>
                <NavLink to='/products'>Product A-Z</NavLink>
                <NavLink to='/vouchers'>Buy Gift Vouchers</NavLink>
              </FooterBox>
              <FooterBox>
                <h3>FOLLOW US</h3>
                <NavLink to='/Facebook'>Facebook</NavLink>
                <NavLink to='/Twitter'>Twitter</NavLink>
                <NavLink to='/YouTube'>YouTube</NavLink>
              </FooterBox>
            </FooterLayout>
          </Footer>
        </div>
          : <div>Loading...</div> 
        }
      </Router>
    );
  }
}

const Test = ({match}) => {
  return(
    <div>
      <div>{match.params.id}</div>
      <div>NOTHING HERE</div>
    </div>
  )
} 

const department = [
  {
      id : 1,
      name : 'Women'
  },
  {
      id : 2,
      name : 'Men'
  },
  {
      id : 3,
      name : 'Kids'
  },
  {
      id : 4,
      name : 'Shoes'
  },    
  {
      id : 5,
      name : 'Brands'
  }    
]

function mapStateToProps(state, props){
  const departments = state.get('departments')
  // if(departments){
    // state.get('departments')
  //   .map(item => {
  //     console.log(item)
  //   })
  // }
  // console.log(departments)
  const isLoading = state.get('isLoading')
  return {
    departments,
    isLoading
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions : bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
