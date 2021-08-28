
export class About extends React.Component {
  
    interval;
    componentDidMount() {
    //   this.interval = setInterval (() => {
    //     console.log('About mounted');
    //   },2000) 
    }
    
    componentWillUnmount() {
    //   clearInterval(this.interval)
    }
    
  
    render() {
  
      return (
        <section className="about">
        <div>
          <img src="../css/img/martin.jpg"></img>
          <div className="socials">
                      <a href="https://www.linkedin.com/in/martin-sh/" target="_blank"></a>
                      <a href="https://www.facebook.com/profile.php?id=780713764" target="_blank"></a>
                      <a href="https://github.com/martin-shn" target="_blank"></a>
                  </div>
                  <p>Martin Sh</p>
          </div>                
        <div>
          <img src="../css/img/shaul.png"></img>
          <div className="socials">
                      <a href="linkedin.com/in/shaul-batzon-a65b98169/" target="_blank"></a>
                      <a href="https://www.facebook.com/shaul.batzon" target="_blank"></a>
                      <a href="https://github.com/ShaulBatzon" target="_blank"></a>
                  </div>
                  <p>Shaul Batzon</p>
          </div>
        </section>
      )
    }
  }
  