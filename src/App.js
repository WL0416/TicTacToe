// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Provider, { Consumer } from "./data/context";
import Header from "./views/layout/Header";
import Footer from "./views/layout/Footer";
import MainContent from "./views/layout/MainContent";
import Home from "./views/pages/Home";
import Game from "./views/pages/Game";

function App() {
  return (
    <Provider>
      <Consumer>
        {(value) => {
          const { siteContent } = value;

          const [siteContentValue] = siteContent;

          const { data } = siteContentValue;

          // console.log(data);

          if (data === undefined) {
            return <div className="App"></div>;
          } else {
            return (
              <Router>
                <div className="App">
                  <Header
                    headerContent={data.header}
                    mainMenu={data.main_menu}
                  ></Header>
                  <Switch>
                    <MainContent>
                      <Route
                        exact
                        path="/TicTacToe"
                        component={() => (
                          <Home homeContent={data.pgs[0].home[0]} />
                        )}
                      />
                      <Route exact path="/ttt" component={Game} />
                      <Route
                        exact
                        path="/info"
                        component={() => (
                          <Home homeContent={data.pgs[0].info[0]} />
                        )}
                      />
                    </MainContent>
                  </Switch>
                  <Footer
                    footerContent={data.footer}
                    termsAndConditions={data.pgs[0].terms_and_conditions[0]}
                    privacy={data.pgs[0].privacy_policy[0]}
                    contactApi={data.loc[0].SCRIPT__contact_form[0].$.u}
                  ></Footer>
                </div>
              </Router>
            );
          }
        }}
      </Consumer>
    </Provider>
  );
}

export default App;
