const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');
const passport = require('passport');

passport.use(new LocalStrategy(async (USERNAME , password , done) => {
    try {
      // console.log('recevied credentials', USERNAME, password);
      const user = await Person.findOne({username :USERNAME})
      if (!user) return done(null, false, { message: 'Incorrect username.' });
  
      const isPasswordMatch = user.password === password ? true : false ;
      if (!isPasswordMatch) {
        return done(null, false , { message : 'password incorrect'});
        }
        return done(null, user);
        
    } catch (error) {
      return done(error);
    }
   }));

   module.exports = passport;