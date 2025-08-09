const scriptURL = 'https://script.google.com/macros/s/AKfycbxRHtdqbEOzvL0lhi_juobhLCYljbn4Tp9CNclwfvb3jsW5hLbJfJqPSOD8cUPvSRRj/exec'

const form = document.forms['hackathonForm']

form.addEventListener('submit', async (e) => {
  
  e.preventDefault()
  
  // Show loading alert
  Swal.fire({
    title: 'Submitting...',
    text: 'Please wait while we process your registration',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
  
  try {
    const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    // const result = await response.json(); // Read JSON from server
    
    if (response.ok) {
      // Show success message
      await Swal.fire({
        title: "Thank you!",
        text: "Your registration has been submitted successfully!",
        icon: "success",
        confirmButtonText: 'OK',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      })

 
      window.location.reload()
    } else {
      throw new Error(result.error || 'Data not saved to sheet');
    }
  } catch (error) {
    console.error('Error!', error.message)
    
    // Show error message
    Swal.fire({
      title: 'Error!',
      text: 'There was an error submitting your form. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
  
})