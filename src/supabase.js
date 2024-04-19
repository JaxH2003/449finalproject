import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabaseUrl = 'https://jyfcglcsefurczqhywcg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5ZmNnbGNzZWZ1cmN6cWh5d2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5ODc3NDQsImV4cCI6MjAyODU2Mzc0NH0.W-YnRdaa2fbGiG7lwWVPNDqDFZ9MISKN0bQDl_jum_M'
const supabase = createClient(supabaseUrl, supabaseKey)


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