import React, { useState } from 'react';
import './RoundRobin.css';

 function RoundRobin() {
   const [processes, setProcesses] = useState([]);
   const [arrivalTimes,setArrivalTimes]=useState([]);
   const [burstTimes, setBurstTimes] = useState([]); // it consists array of values
   const [quantumTime, setQuantumTime] = useState('');// it consists only one value
   const [results, setResults] = useState(null);
   // eslint-disable-next-line no-unused-vars
   const [ganttChart, setGanttChart] = useState([]);
   const [completionTimes, setCompletionTimes] = useState([]);

  const handleProcessChange = (e, index) => {
     const newProcesses = [...processes];
     newProcesses[index] = e.target.value;
     setProcesses(newProcesses);
   };

   const handleArrivalTimeChange = (e, index) => {
    const newArrivalTimes = [...arrivalTimes];
     newArrivalTimes[index] = parseInt(e.target.value);
     setArrivalTimes(newArrivalTimes);
   };

   const handleBurstTimeChange = (e, index) => {
    const newBurstTimes = [...burstTimes];
     newBurstTimes[index] = parseInt(e.target.value);
     setBurstTimes(newBurstTimes);
   };

   const handleQuantumTimeChange = (e) => {
     setQuantumTime(parseInt(e.target.value));
   };

   const sortProcessesByArrivalTime = () => {
    return processes.map((process, index) => ({ process, arrivalTime: arrivalTimes[index], index })).sort((a, b) => a.arrivalTime - b.arrivalTime);
    };

    const renderGanttChart = () => {
      return (
        <div className="gantt-chart">
          {ganttChart.map((process, index) => (
            <div key={index} className={`process-${process.p_no}`} style={{ width: `${process.duration * 20}px` }}>
              {`P${process.p_no}`}
            </div>
          ))}
        </div>
      );
    };
   //this variable the main Algorithm of Round Robin Scheduling.
   const handleSubmit = (e) => {
    e.preventDefault();
  
    const sortedProcesses = sortProcessesByArrivalTime();
    let currentTime = 0;
    let remainingBurstTimes = [...burstTimes];
    let completionTimes = new Array(processes.length).fill(0);
    let turnaroundTimes = new Array(processes.length).fill(0);
    let waitingTimes = new Array(processes.length).fill(0);
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let quantum = quantumTime;
    let readyQueue = sortedProcesses.map((process) => process.index);
  
    while (readyQueue.length > 0) {
      let allCompleted = true;
  
      for (let i = 0; i < readyQueue.length; i++) {
        const currentProcessIndex = readyQueue[i];
        const burstTime = Math.min(quantum, remainingBurstTimes[currentProcessIndex]);
        
        ganttChart.push({ p_no: currentProcessIndex + 1, start: currentTime, duration: burstTime });
        
        currentTime += burstTime;
        remainingBurstTimes[currentProcessIndex] -= burstTime;
  
        if (remainingBurstTimes[currentProcessIndex] === 0) {
          completionTimes[currentProcessIndex] = currentTime;
          turnaroundTimes[currentProcessIndex] = completionTimes[currentProcessIndex] - arrivalTimes[currentProcessIndex];
          waitingTimes[currentProcessIndex] = turnaroundTimes[currentProcessIndex] - burstTimes[currentProcessIndex];
          readyQueue.splice(i, 1); // Remove completed process from the ready queue
          i--; // Adjust loop index since we removed an element
        } else {
          allCompleted = false;
        }
      }
  
      if (allCompleted) break;
    }
  
    // totalWaitingTime = waitingTimes.reduce((acc, curr) => acc + curr, 0);
    // totalTurnaroundTime = turnaroundTimes.reduce((acc, curr) => acc + curr, 0);
  
    const averageWaitingTime = totalWaitingTime / processes.length;
    const averageTurnaroundTime = totalTurnaroundTime / processes.length;
  
    setResults({ waitingTimes, turnaroundTimes, averageWaitingTime, averageTurnaroundTime });
    setCompletionTimes(completionTimes);
  };
  
  
  
   const renderResults = () => {
     if (!results) return null;

     return (
       <div>
         <h2>Results</h2>
         <table>
           <thead>
             <tr>
               <th>Process</th>
               <th>Arrival Time</th>
               <th>Burst Time</th>
               <th>Completion Time</th>
               <th>Turnaround Time</th>
               <th>Waiting Time</th>
             </tr>
           </thead>
           <tbody>
             {processes.map((process, index) => (
               <tr key={index}>
                 <td>{index+1}</td>
                 <td>{arrivalTimes[index]}</td>
                 <td>{burstTimes[index]}</td>
                 <td>{completionTimes[index]}</td>
                 <td>{results.turnaroundTimes[index]}</td>
                 <td>{results.waitingTimes[index]}</td>
               </tr>
             ))}
           </tbody>
         </table>
         <p>Average Waiting Time: {results.averageWaitingTime}</p>
         <p>Average Turnaround Time: {results.averageTurnaroundTime}</p>
       </div>
     );
   };

   //this variable prints the gantt chart
  //  const renderGanttChart = () => {
    
  //    return (
  //      <div className="gantt-chart">
  //        {ganttChart.map((process, index) => (
  //          <div key={index} className={`process-${process.p_no}`} style={{ width: `${process.end - process.start}em` }}>
  //            {`P${process.p_no}`}
  //         <span className="process-label">P{process.p_no}</span>
  //         <span className="time-subscript start-time">{process.start}</span>
  //         <span className="time-subscript end-time">{process.end}</span>
  //          </div>
  //        ))}
  //      </div>
  //   );
  // };

  //returns and calculate the whole calculation of Round Robin(including gantt chart).
  return (
    <div className="container">
      <h1>Round Robin CPU Scheduling</h1>
      <form onSubmit={handleSubmit}>
        <div class="input-container">
        <label htmlFor="quantumTime">Quantum Time:</label>
        <input type="number" id="quantumTime" value={quantumTime} onChange={handleQuantumTimeChange} required />

         <div>
           <label htmlFor="processCount">Number of Processes:</label>
           <input type="number" id="processCount" value={processes.length} disabled />
         </div>
        </div>
         <div class="btn">
           <button type="button" onClick={() => {
            setProcesses([...processes, '']);
            setArrivalTimes([...arrivalTimes, 0]); // Default arrival time
            setBurstTimes([...burstTimes, 0]); // Default burst time
           }}>
             Add Process
           </button>
         </div>

         {processes.map((process, index) => (
           <div key={index} className="input-container">
             <label htmlFor={`process${index}`}>Process {index + 1}:</label>
             <input
               type="text"
               id={`process${index}`}
               value={process}
               onChange={(e) => handleProcessChange(e, index)}
               required
             />
             <label htmlFor={`arrivalTime${index}`}>Arrival Time:</label>
             <input
               type="number"
               id={`arrivalTime${index}`}
               value={arrivalTimes[index] ?? ''}
               onChange={(e) => handleArrivalTimeChange(e, index)}
               required
             />
             <label htmlFor={`burstTime${index}`}>Burst Time:</label>
             <input
               type="number"
               id={`burstTime${index}`}
               value={burstTimes[index] ?? ''}
               onChange={(e) => handleBurstTimeChange(e, index)}
               required
             />
           </div>
         ))}
        <div class="btn">
         <button type="submit">Calculate</button>
        </div>
       </form>

       {renderResults()}
       {renderGanttChart()}
     </div>
   );
 }

export default RoundRobin;

