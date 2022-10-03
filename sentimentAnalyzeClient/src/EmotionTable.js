import React from 'react';
import './bootstrap.min.css';




class EmotionTable extends React.Component {
    render() {
      //Returns the emotions as an HTML table

      //console.log(Object.keys(this.props.emotions));      

      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
             Object.entries(this.props.emotions).map( (e) => (
              
              <tr >
                <td style={{width:"50%"}} >{e[0]}</td> 
                <td style={{width:"50%"}} >{e[1]}</td>
              </tr>
              

              ))}
           


            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;