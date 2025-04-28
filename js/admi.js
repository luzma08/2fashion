document.getElementById("userSelect").addEventListener("change", function() {
    const selectedValue = this.value;
    if (selectedValue) {
        window.location.href = selectedValue; // Redirige en la misma pestaña
    }
});

document.getElementById("userSelect").addEventListener("change", function() {
    const selectedValue = this.value;
    if (selectedValue) {
        window.location.href = selectedValue; // Redirige en la misma pestaña
    }
});






const supabaseUrl = "https://hxrcmbaxxfvlgubpdifu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cmNtYmF4eGZ2bGd1YnBkaWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTgxNzQsImV4cCI6MjA1ODA3NDE3NH0.uPrLyN5PfPv8kx414tZetdQLkiQGXq9Lkg_kJZ1zvyc";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loginUser() {
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('contraseña').value;
    

    
                let { data, error } = await supabase
                .from('admi')
                .select('*')
                .eq('email', correo)
                .eq('codigo', password)
                .single();  // Para traer solo un usuario
        
                console.log("Resultado de la consulta:", data, error);

                if (error || !data) {
                    alert("Correo o contraseña incorrectos");
                    console.error(error);
                } else {
                    alert("Correo o contraseña correctos");
                    console.log("Usuario encontrado:", data);
                    window.location.href = "pago.html";
                }
            }
