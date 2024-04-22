//import logo from './logo.svg';
import './App.css';
import Weather from './Weather';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://jyfcglcsefurczqhywcg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5ZmNnbGNzZWZ1cmN6cWh5d2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5ODc3NDQsImV4cCI6MjAyODU2Mzc0NH0.W-YnRdaa2fbGiG7lwWVPNDqDFZ9MISKN0bQDl_jum_M'
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  return (
    <body class='bg-blue-300 min-h-screen'>
      <h1 class="text-3xl font-bold mb-4 text-center">Weather for East Lansing Michigan</h1>
      <div class="mx-auto px-4 flex justify-center items-start">
        <Weather />
        <div class="ml-8">
          <table class="border border-black text-lg w-full h-auto text-center py-4 px-8 mt-40 pr-80" id="averages">
          </table>
        </div>
      </div>
      <script type="module" src="supabase.js"></script>
    </body>
  );
}

async function getAverage() {
  let { data: averages } = await supabase
  .from('averages')
  .select('*')
  
  for (let average of averages) {
    let averageList = document.getElementById('averages');
    averageList.innerHTML += `<tr><td>${average.day}</td><td>${average.average}</td><td>`;
   }
  }
  
getAverage();



export default App;
