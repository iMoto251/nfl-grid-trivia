import * as React from 'react';
//import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import "./css/Game.css"

function SelectorNFL(){
    return(
        <optgroup label="NFL Teams">
            <option value="ARI">Arizona Cardinals</option>
            <option value="ATL">Atlanta Falcons</option>
            <option value="BAL">Baltimore Ravens</option>
            <option value="BUF">Buffalo Bills</option>
            <option value="CAR">Carolina Panthers</option>
            <option value="CHI">Chicago Bears</option>
            <option value="CIN">Cincinnati Bengals</option>
            <option value="CLE">Cleveland Browns</option>
            <option value="DAL">Dallas Cowboys</option>
            <option value="DEN">Denver Broncos</option>
            <option value="DET">Detroit Lions</option>
            <option value="GNB">Green Bay Packers</option>
            <option value="HOU">Houston Texans</option>
            <option value="IND">Indianapolis Colts</option>
            <option value="JAX">Jacksonville Jaguars</option>
            <option value="KAN">Kansas City Chiefs</option>
            <option value="LVR">Las Vegas Raiders</option>
            <option value="LAC">Los Angeles Chargers</option>
            <option value="LAR">Los Angeles Rams</option>
            <option value="MIA">Miami Dolphins</option>
            <option value="MIN">Minnesota Vikings</option>
            <option value="NWE">New England Patriots</option>
            <option value="NOR">New Orleans Saints</option>
            <option value="NYG">New York Giants</option>
            <option value="NYJ">New York Jets</option>
            <option value="PHI">Philadelphia Eagles</option>
            <option value="PIT">Pittsburgh Steelers</option>
            <option value="SFO">San Francisco 49ers</option>
            <option value="SEA">Seattle Seahawks</option>
            <option value="TAM">Tampa Bay Buccaneers</option>
            <option value="TEN">Tennessee Titans</option>
            <option value="WAS">Washington Commanders</option>
        </optgroup>
    )
}

function SelectorColleges(){
    return(
        <optgroup label="Colleges">
            <option>Abilene Christian</option>
            <option>Air Force</option>
            <option>Akron</option>
            <option>Ala-Birmingham</option>
            <option>Alabama</option>
            <option>Alabama A&M</option>
            <option>Alabama St.</option>
            <option>Alcorn St.</option>
            <option>Appalachian St.</option>
            <option>Arizona</option>
            <option>Arizona St.</option>
            <option>Ark-Pine Bluff</option>
            <option>Arkansas</option>
            <option>Arkansas St.</option>
            <option>Army</option>
            <option>Auburn</option>
            <option>Ball St.</option>
            <option>Baylor</option>
            <option>Bethune-Cookman</option>
            <option>Boise St.</option>
            <option>Boston Col.</option>
            <option>Boston Univ.</option>
            <option>Bowling Green</option>
            <option>Brown</option>
            <option>Bucknell</option>
            <option>Buffalo</option>
            <option>Butler (KS)</option>
            <option>BYU</option>
            <option>Cal Poly-San Luis Obispo</option>
            <option>Cal State-Fullerton</option>
            <option>California</option>
            <option>Carnegie Mellon</option>
            <option>Carson-Newman</option>
            <option>Central Arkansas</option>
            <option>Central Florida</option>
            <option>Central Michigan</option>
            <option>Central Oklahoma</option>
            <option>Central State (OH)</option>
            <option>Chattanooga</option>
            <option>Chicago</option>
            <option>Cincinnati</option>
            <option>Clemson</option>
            <option>Coastal Carolina</option>
            <option>Colgate</option>
            <option>Colorado</option>
            <option>Colorado St.</option>
            <option>Columbia</option>
            <option>Connecticut</option>
            <option>Cornell</option>
            <option>Dartmouth</option>
            <option>Dayton</option>
            <option>Delaware</option>
            <option>Detroit Mercy</option>
            <option>Drake</option>
            <option>Duke</option>
            <option>Duquesne</option>
            <option>East Carolina</option>
            <option>East Mississippi CC</option>
            <option>East. Illinois</option>
            <option>East. Kentucky</option>
            <option>East. Michigan</option>
            <option>East. Washington</option>
            <option>Florida</option>
            <option>Florida A&M</option>
            <option>Florida Atlantic</option>
            <option>Florida International</option>
            <option>Florida St.</option>
            <option>Fordham</option>
            <option>Fresno St.</option>
            <option>Furman</option>
            <option>George Washington</option>
            <option>Georgetown (DC)</option>
            <option>Georgia</option>
            <option>Georgia Southern</option>
            <option>Georgia Tech</option>
            <option>Gonzaga</option>
            <option>Grambling St.</option>
            <option>Grand Valley St.</option>
            <option>Hampton</option>
            <option>Hardin-Simmons</option>
            <option>Harvard</option>
            <option>Hawaii</option>
            <option>Hofstra</option>
            <option>Holy Cross</option>
            <option>Houston</option>
            <option>Howard</option>
            <option>Idaho</option>
            <option>Idaho St.</option>
            <option>Illinois</option>
            <option>Illinois St.</option>
            <option>Indiana</option>
            <option>Iowa</option>
            <option>Iowa St.</option>
            <option>Jackson St.</option>
            <option>Jacksonville St.</option>
            <option>James Madison</option>
            <option>Kansas</option>
            <option>Kansas St.</option>
            <option>Kent St.</option>
            <option>Kentucky</option>
            <option>La-Monroe</option>
            <option>Lafayette</option>
            <option>Lamar</option>
            <option>Lehigh</option>
            <option>Liberty</option>
            <option>Long Beach St.</option>
            <option>Louisiana</option>
            <option>Louisiana Tech</option>
            <option>Louisville</option>
            <option>LSU</option>
            <option>Maine</option>
            <option>Marquette</option>
            <option>Marshall</option>
            <option>Maryland</option>
            <option>Massachusetts</option>
            <option>McNeese St.</option>
            <option>Md-Eastern Shore</option>
            <option>Memphis</option>
            <option>Miami (FL)</option>
            <option>Miami (OH)</option>
            <option>Michigan</option>
            <option>Michigan St.</option>
            <option>Middle Tenn. St.</option>
            <option>Minnesota</option>
            <option>Miss. Valley St.</option>
            <option>Mississippi</option>
            <option>Mississippi Gulf Coast CC</option>
            <option>Mississippi St.</option>
            <option>Missouri</option>
            <option>Montana</option>
            <option>Montana St.</option>
            <option>Morgan St.</option>
            <option>Murray St.</option>
            <option>Navy</option>
            <option>Nebraska</option>
            <option>Nevada</option>
            <option>New Hampshire</option>
            <option>New Mexico</option>
            <option>New Mexico St.</option>
            <option>Nicholls St.</option>
            <option>None</option>
            <option>Norfolk St.</option>
            <option>North Alabama</option>
            <option>North Carolina</option>
            <option>North Carolina A&T</option>
            <option>North Carolina Central</option>
            <option>North Carolina St.</option>
            <option>North Dakota</option>
            <option>North Dakota St.</option>
            <option>North Texas</option>
            <option>Northern Arizona</option>
            <option>Northern Illinois</option>
            <option>Northern Iowa</option>
            <option>Northwest Mississippi CC</option>
            <option>Northwestern</option>
            <option>Northwestern St. (LA)</option>
            <option>Notre Dame</option>
            <option>NYU</option>
            <option>Ohio</option>
            <option>Ohio St.</option>
            <option>Oklahoma</option>
            <option>Oklahoma St.</option>
            <option>Old Dominion</option>
            <option>Oregon</option>
            <option>Oregon St.</option>
            <option>Pacific</option>
            <option>Penn St.</option>
            <option>Pennsylvania</option>
            <option>Pittsburgh</option>
            <option>Portland St.</option>
            <option>Prairie View A&M</option>
            <option>Princeton</option>
            <option>Purdue</option>
            <option>Rhode Island</option>
            <option>Rice</option>
            <option>Richmond</option>
            <option>Rutgers</option>
            <option>S.F. Austin</option>
            <option>Sacramento St.</option>
            <option>Sam Houston St.</option>
            <option>Samford</option>
            <option>San Diego St.</option>
            <option>San Francisco</option>
            <option>San Jose St.</option>
            <option>Santa Clara</option>
            <option>SE Missouri St.</option>
            <option>SMU</option>
            <option>South Carolina</option>
            <option>South Carolina St.</option>
            <option>South Dakota</option>
            <option>South Dakota St.</option>
            <option>South Florida</option>
            <option>Southern</option>
            <option>Southern Illinois</option>
            <option>Southern Miss</option>
            <option>St. Mary's (CA)</option>
            <option>St. Thomas</option>
            <option>Stanford</option>
            <option>Syracuse</option>
            <option>TCU</option>
            <option>Temple</option>
            <option>Tennessee</option>
            <option>Tennessee St.</option>
            <option>Texas</option>
            <option>Texas A&M</option>
            <option>Texas A&M-Commerce</option>
            <option>Texas A&M-Kingsville</option>
            <option>Texas Southern</option>
            <option>Texas St.</option>
            <option>Texas Tech</option>
            <option>Texas-Arlington</option>
            <option>Texas-El Paso</option>
            <option>The Citadel</option>
            <option>Toledo</option>
            <option>Troy</option>
            <option>Tulane</option>
            <option>Tulsa</option>
            <option>UC Davis</option>
            <option>UCLA</option>
            <option>UNLV</option>
            <option>USC</option>
            <option>Utah</option>
            <option>Utah St.</option>
            <option>Valdosta St.</option>
            <option>Vanderbilt</option>
            <option>Villanova</option>
            <option>Virginia</option>
            <option>Virginia Tech</option>
            <option>Wake Forest</option>
            <option>Washington</option>
            <option>Washington & Jefferson</option>
            <option>Washington St.</option>
            <option>Weber St.</option>
            <option>West Texas A&M</option>
            <option>West Virginia</option>
            <option>West Virginia Wesleyan</option>
            <option>Western Illinois</option>
            <option>Western Kentucky</option>
            <option>Western Michigan</option>
            <option>Wichita St.</option>
            <option>William & Mary</option>
            <option>Wisconsin</option>
            <option>Wyoming</option>
            <option>Xavier (OH)</option>
            <option>Yale</option>
            <option>Youngstown St.</option>
        </optgroup>
    )
}

function SelectorStats(){
    return(
        <optgroup label="Stat Category">
            <option value="pass5000">5000 Yard Passing Season</option>
            <option value="pass4000">4000 Yard Passing Season</option>
            <option value="pass3000">3000 Yard Passing Season</option>
            <option value="rush2000">2000 Yard Rushing Season</option>
            <option value="rush1500">1500 Yard Rushing Season</option>
            <option value="rush1250">1250 Yard Rushing Season</option>
            <option value="rush1000">1000 Yard Rushing Season</option>
            <option value="rec1750">1750 Yard Receiving Season</option>
            <option value="rec1500">1500 Yard Receiving Season</option>
            <option value="rec1250">1250 Yard Receiving Season</option>
            <option value="rec1000">1000 Yard Receiving Season</option>
            <option value="recep110">110 Reception Season</option>
            <option value="recep100">100 Reception Season</option>
        </optgroup>
    )
}
function Game(){
    
    return(
        <div className="game-container">
            <div className="game">
            <div className="choiceCell">
                <button id="choiceButton" className='choiceButtons'>Check Choices</button>
            </div>
            <div className="choiceCell">
                <select id="topleft" className='selectorBoxes'>
                    <SelectorNFL/>
                    <SelectorColleges/>
                    <SelectorStats/>
                </select>
            </div>
            <div className="choiceCell">
                <select id="topmiddle" className='selectorBoxes'>
                    <SelectorNFL/>
                    <SelectorColleges/>
                    <SelectorStats/>
                </select>
            </div>
            <div className="choiceCell">
                <select id="topright" className='selectorBoxes'>
                    <SelectorNFL/>
                    <SelectorColleges/>
                    <SelectorStats/>
                </select>
            </div>
            <div className="choiceCell">
                <select id="lefttop" className='selectorBoxes'>
                    <SelectorNFL/>
                    <SelectorColleges/>
                    <SelectorStats/>
                </select>
            </div>
            <div className="inputCell"><input id='oneone' className='inputBoxes'></input></div>
            <div className="inputCell"><input id='onetwo' className='inputBoxes'></input></div>
            <div className="inputCell"><input id='onethree' className='inputBoxes'></input></div>
            <div className="choiceCell">
                <select id="leftmiddle" className='selectorBoxes'>
                    <SelectorNFL/>
                    <SelectorColleges/>
                    <SelectorStats/>
                </select>
            </div>
            <div className="inputCell"><input id='twoone' className='inputBoxes'></input></div>
            <div className="inputCell"><input id='twotwo' className='inputBoxes'></input></div>
            <div className="inputCell"><input id='twothree' className='inputBoxes'></input></div>
            <div className="choiceCell">
                <select id="leftbottom" className='selectorBoxes'>
                    <SelectorNFL/>
                    <SelectorColleges/>
                    <SelectorStats/>
                </select>
            </div>
            <div className="inputCell"><input id='threeone' className='inputBoxes'></input></div>
            <div className="inputCell"><input id='threetwo' className='inputBoxes'></input></div>
            <div className="inputCell"><input id='threethree' className='inputBoxes'></input></div>
            </div>
        </div>
    )
}

export default Game;