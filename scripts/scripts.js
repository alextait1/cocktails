$(function() {

            //smooth scroll enabled here
            $('a').smoothScroll({
                offset: -300,
                afterScroll: function() {
                    $(this).find('input').submit();
                },
            });

            //radio button enabled here
            $('input').iCheck({
               checkboxClass: 'icheckbox_square-yellow',
               radioClass: 'iradio_square-yellow',
               increaseArea: '20%' // optional
           });

            //set all default value to 0 
            var scores = {
                oldPal: 0,
                beesKnees: 0,
                daiquiri: 0,
                martini: 0,
                corpseReviver2: 0,
                darkAndStormy: 0,
                pinkLady: 0,
                whiteRussian: 0
            } 

            //display stuff on results for template literal
            var displayStuff = {
                oldPal: {
                    title: 'Old Pal',
                    img: 'oldPal.JPG',
                    recipe: '1 1/4oz Canadian Whisky, 1 1/4oz Campari, 1 1/4oz Dry Vermouth',
                },

                beesKnees: {
                    title: 'Bees Knees',
                    img: 'beesKnees.jpg',
                    recipe: '2oz Gin, 3/4oz Lemon Juice, 3/4oz Honey Simple Syrup'
                },

                daiquiri: {
                    title: 'Daiquiri',
                    img: 'daiquiri.jpeg',
                    recipe: '1 1/2oz White Rum, 1/2oz Simple Syrup'
                },

                martini: {
                    title: 'Martini',
                    img: 'martini.jpg',
                    recipe: '1/2oz Dry Vermouth, 3oz Gin'
                },

                corpseReviver2: {
                    title: "Corpse Reviver #2",
                    img: 'corpseReveiver2.jpg',
                    recipe: '1oz Gin, 1oz Lillet Blanc, 1oz Lemon Juice, 1 dash Absinthe'
                },

                darkAndStormy: {
                    title: 'Dark and Stormy',
                    img: 'darkAndStormy.jpg',
                    recipe: '2oz Dark Rum, 1/2oz Lime Juice, Ginger Beer'
                },

                pinkLady: {
                    title: 'Pink Lady',
                    img: 'pinkLady.jpg',
                    recipe: '1 1/2oz Gin, 1/2 Applejack, 1/2oz Lemon Juice, 1 Egg White, 2 dashes of Grenadine'
                },

                whiteRussian: {
                    title: 'White Russian',
                    img: 'whiteRussian.jpg',
                    recipe: '1oz Coffee Liqueur, 1 1/2 Vodka, 1oz Cream'
                }
            }  

            //all questions in the form need to be answered in order for final results
            var numberOfQs = $('form').length;
            var questionsAnswered = 0;
            //questionsAnswered will add 1 number each time a question is answered on the quiz
            
            //the figureOutCocktail function will add scores to "scores" variable and spit out the highest number
            function figureOutCocktail() {
                 var scoresKeys = Object.keys(scores);
            
                 var scoresArray = scoresKeys.map(function(userResults){
                    return {
                        value: userResults,
                        score: scores[userResults]
                    }
                });

                scoresArray.sort(function(a,b){
                    return b.score - a.score 
                });

                //winner is the cocktail with the highest score
                var winner = scoresArray[0].value;
                 console.log(scoresArray[0].value); 

                //template literal for result information being taken from displayStuff var
                var container = 
                `<div class="result__container">
                    <h2 class="result-card">${displayStuff[winner].title}</h2>
                    <img src="assets/${displayStuff[winner].img}" alt"${displayStuff[winner].title}">
                    <p>${displayStuff[winner].recipe}</p>
                </div>`
                
                //display on html page
                console.log(container);
                $('#result').html(container);
            }

            //event for form answers
            //on submit add one point to each cocktail that has been chosen behind the scenes
            //disable the submit button once it has been clicked

            $('form').on('submit', function(event) {
                event.preventDefault();
                var choice = $(this).find('input[type=radio]:checked').data();
                $(this).find('input[type=submit]').attr('disabled', true);
                for (var key in choice) {
                    var chosenCocktail = choice[key];
                    scores[chosenCocktail]++;
                }

                questionsAnswered += 1;

                if (numberOfQs === questionsAnswered) {
                    figureOutCocktail();
                }
            });


        });   