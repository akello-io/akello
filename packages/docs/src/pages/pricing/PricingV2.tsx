
export default function PricingPage(): JSX.Element {
  return (
    <div className="mx-auto">
      
        <div className='flex py-12'>                    
          <table>            
            <thead>
              <tr>
                <th/>
                <th colSpan={4}>Cloud Hosted</th>
                <th colSpan={2}>Self Hosted</th>
              </tr>
              <tr>
                <th />
                <th>
                  Evaluation
                  <sup>
                    <a href="#note1">1</a>
                  </sup>
                </th>
                <th>
                  Individual
                  <sup>
                    <a href="#note2">2</a>
                  </sup>
                </th>
                <th>
                  Teams
                  <sup>
                    <a href="#note3">3</a>
                  </sup>
                </th>
                <th>
                  Enterprise
                  <sup>
                    <a href="#note4">4</a>
                  </sup>
                </th>                
                <th>
                  Community
                  <sup>
                    <a href="#note5">5</a>
                  </sup>
                </th>   
                <th>
                  Enterprise Managed
                  <sup>
                    <a href="#note6">6</a>
                  </sup>
                </th>                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Pricing
                  <sup>
                    <a href="#note7">7</a>
                  </sup>
                </td>
                <td>Free</td>
                <td>
                  <a>$80 /mo</a>
                </td>
                <td>
                  <a>Coming soon</a>
                </td>
                <td>
                  <a>Contact us</a>
                </td>
                <td>Free</td>
                <td>
                  <a>Contact us</a>
                </td>
              </tr>
              <tr>
                <td>Standard BAA</td>
                <td></td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>          
                <td></td>      
                <td>✔️</td>                
              </tr>              
              <tr>
                <td>
                  Billing Reports                  
                </td>
                <td></td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td></td>
                <td>✔️</td>
              </tr>
              <tr>
                <td>
                  Clinical Ops Automations                  
                </td>
                <td></td>
                <td>✔️</td>
                <td>✔️</td>
                <td>Custom</td>
                <td></td>
                <td>✔️</td>
              </tr>
              <tr>
                <td>
                  Measurements                  
                </td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
              </tr>
              <tr>
                <td>
                  Users                  
                </td>
                <td>1</td>
                <td>1</td>
                <td>Unlimited</td>   
                <td>Unlimited</td>   
                <td></td>             
                <td>Unlimited</td>   
              </tr>                            
              <tr>
                <td>
                  Patients
                  <sup>
                    <a href="#note8">8</a>
                  </sup>
                </td>
                <td>100</td>
                <td>300</td>
                <td>1,000 /user on team</td>
                <td>Contact us</td>   
                <td></td>             
                <td>Contact us</td>   
              </tr>         
              
              <tr>
                <td>SMS</td>
                <td></td>
                <td></td>
                <td>✔️</td>
                <td>✔️</td>
                <td>DIY</td>             
                <td>Contact us</td>   
              </tr>
              <tr>
                <td>Telehealth</td>
                <td></td>
                <td></td>
                <td></td>
                <td>✔️</td>
                <td>DIY</td>             
                <td>Contact us</td>   
              </tr>                   
              <tr>
                <td>EHR</td>
                <td></td>
                <td></td>
                <td></td>
                <td>✔️</td>                
                <td>DIY</td>             
                <td>Contact us</td>   
              </tr>      
              <tr>
                <td>Integrations</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>Custom</td>    
                <td>DIY</td>             
                <td>Contact us</td>               
              </tr>      
              <tr>
                <td>Support</td>
                <td>Discord, Github</td>
                <td>Discord, Github</td>
                <td>Discord (SLA), Github (SLA)</td>
                <td>Contact us</td>  
                <td>Discord, Github</td>
                <td>Contact us</td>                   
                          
              </tr>       
              <tr>
                <td>SOC 2</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>✔️</td>
                <td>DIY</td>
                <td>✔️</td>
              </tr>       
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ maxWidth: 900, margin: '20px auto', lineHeight: 1.75 }}>
            <h3>Notes</h3>
            <ol>
              <li id="note1">
                <strong>Evaluation</strong>: recommended for learning about Akello and a new clinical measurement-based program.
              </li>
              <li id="note2">
                <strong>Individual</strong>: recommended for billing and small implementations for a single care manager ready.
              </li>
              <li id="note3">
                <strong>Teams</strong>: recommended for teams that have adopted measurement-based care and want to scale up the program.                
              </li>
              <li id="note4">
                <strong>Enterprise</strong>: recommended for institutions with complex workflow, integration or data requirements.
              </li>
              <li id="note5">
                <strong>Community</strong>: refers to self-hosting {' '} <a href="https://github.com/akello-io/akello">Akello </a>.
              </li>
              <li id="note6">
                <strong>Enterprise Managed</strong>: recommended for those who must host the application on their own cloud infrastructure and need support from Akello.
              </li>
              <li id="note7">
                Pricing is charged annually and is subject to change.
              </li>              
              <li id="note8">
                Patients refers to the total number of patients (active, deactivated) in a registry. If a maximum is reached the user will need to clear out old data in order to add new patients.
              </li>              
            </ol>
          </div>
        </div>
      
    </div>
  );
}