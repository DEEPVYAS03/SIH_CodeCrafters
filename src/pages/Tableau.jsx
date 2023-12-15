
import React, { useEffect ,useRef} from 'react';
const { tableau,TableauEventType,TableauDialogType,CrosstabFileFormat ,TableauViz } = window;
export default function Tableau() {
 
  let dashboard;

  function handlecsv()
  {
    
    dashboard.showExportCrossTabDialog();

       
  }
  
  function handlepdf()
  {


    
    dashboard.showExportPDFDialog();


  }

  const ref= useRef(null);
  const url ="https://public.tableau.com/views/KingCountyHouseSalesDashboard/HouseSalesDashboard?:language=en-US&:display_count=n&:origin=viz_share_link"

  const initViz=()=>{
     dashboard= new tableau.Viz(ref.current,url,{
      width:"1500px",
      height:"1000px"
    });
  };

  useEffect(initViz,[]);
  return (
    <>
    <div ref={ref}>
    </div>
    <button onClick={()=>{handlepdf()}}>PDF download</button>
    <button onClick={()=>{handlecsv()}} id="export-csv">CSV download</button>
    </>

  )
}
