function monthDiff(d1, d2) {
  var months;
  d1 = new Date(d1);
  d2 = new Date(d2);
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

export function getDurationText(totalDuration)
{
  let duration = "";
  if (Math.floor(totalDuration / 12)) {
    duration += `${Math.floor(totalDuration / 12)} year${Math.floor(totalDuration / 12) > 1 ? "s" : ""}}`;
  }
  if (totalDuration % 12) {
    duration += `${totalDuration % 12} month${totalDuration % 12 > 1 ? "s" : ""}`;
  }
  return duration;
}

export function convertToGrid(_jobs) : any[] {
  
  let previousJob = null;
  let totalDuration = 0;
  const grid = [];

  function addExperience(job, startDate, endingDate)
  {
    const gap = {
        duration: monthDiff(startDate, endingDate),
        job: job,
      };
      grid.push(gap)
      totalDuration += gap.duration;
  }

  for (let job of _jobs) {

    // add a new grid element based on previous
    if (previousJob) {
      addExperience(null, previousJob.endingDate, job.startingDate);
    }
    addExperience(job, job.startingDate, job.endingDate);
    previousJob = job;
  }

  return [grid, totalDuration];
}