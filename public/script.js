document.getElementById("container").addEventListener("click", (e) => {
  
  if (e.target && e.target.id === 'button-new-user') {
    document.getElementById("form-new-user").submit();
    document.getElementById("form-new-user").reset();
  }
  
  if (e.target && e.target.id === 'button-new-exercise') {
    document.getElementById("form-new-exercise").submit();
    document.getElementById("form-new-exercise").reset();
  }
  
});