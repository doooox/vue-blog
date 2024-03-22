<template>
    <div class="container">
        <div>
        <h2>Contact the Publisher</h2>
        <p>blog@mail.com</p>
        <p>+381 12 345 678</p>
    </div>
    <div>
        <h2>Info</h2>
        <p>About</p>
        <p>Partners</p>
        <p>Job Opportunities</p>
        <p>Advertise</p>
        <p>Membership</p>
    </div> 
    <div>
        <h2>Address</h2>
        <p>404 Some Streed, 
        <br>ST 40404 Some Tows, 
        <br>br>Some Country</p>
    </div>
    <div>
        <h2>Connections</h2>
        <div class="social-container">
            <p>
                <i class="fab fa-facebook"></i>
            </p>
            <p>
                <i class="fab fa-twitter"></i>
            </p>
            <p>
                <i class="fab fa-instagram"></i>
            </p>
            <p>
                <i class="fab fa-linkedin"></i>
            </p>
        </div>
    </div>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    justify-content: space-between;
    background-color: #212529;
    padding: 2rem 5rem;
    margin-top: 2rem;
}
.container p {
    color:#E5E5E5
}
.container h2 {
    color:#fff
}
.social-container{
    display: flex;
    justify-content: space-between;
    padding: 1rem 0
}
</style>

<script setup></script>