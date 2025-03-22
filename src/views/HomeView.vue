<script setup>

</script>

<template>
  <div class="home">
    <div class="home-content">
      <h1>Leder du efter din nye bedste ven?</h1>
      <p>Så er du kommet til det rette sted! Hos Pet Adoption venter skønne hunde, katte, fisk og andre kæledyr på
        et kærligt hjem – måske hos dig? </p>
      <p>Vores dyr er fyldt med kærlighed, loyalitet og glæde, og de er mere end klar til at blive en del af din
        familie. Uanset om du drømmer om en legesyg hvalp, en kælen kat eller en trofast følgesvend, hjælper vi dig med
        at finde det perfekte match.</p>
      <p>Giv et dyr en ny chance – adoptere i dag og få en ven for livet!</p>
      <div class="cta-buttons">
        <router-link to="/pets" class="btn btn-primary">
          Se alle vores skønne dyr
        </router-link>
        <router-link to="/add" class="btn btn-secondary">
          Søger du oprette en adoption?
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background-color: #ffffff;
  color: #333333;
  text-align: center;
  padding: 20px;
}

.home h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #4a6572;
  font-weight: 800;
}

.home-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #4a6572;
  color: white;
  box-shadow: 0 2px 4px rgba(74, 101, 114, 0.3);
}

.btn-primary::after {
  content: '➔';
  margin: 0px 0px 0px 5px;
  color: white !important;
}


.btn-primary:hover {
  background-color: #364d58;
  box-shadow: 0 2px 4px rgba(74, 101, 114, 0.4);
}

.btn-secondary {
  background-color: #ffffff;
  color: #4a6572;
  border: #4a6572 2px solid;
  box-shadow: 0 2px 4px rgba(74, 101, 114, 0.2);
}

.btn-secondary:hover {
  background-color: #f5f7f8;
  color: #334853;
  border-color: #334853;
  box-shadow: 0 2px 4px rgba(74, 101, 114, 0.3);
}
  
</style>