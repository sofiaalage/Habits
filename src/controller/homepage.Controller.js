import Habits from "./habits.controller.js";
import Homepage from "../models/homepage.models.js";

class HomepageController {
	static async listCards() {
		const session = document.getElementById("container");
		const habitsDataBase = await Habits.getHabits();

		const titleHabits = new Homepage();
		const cardTitle = titleHabits.getCardTitle();
		const cardHabitsTitle = titleHabits.getCardHabitsTitle();
		session.appendChild(cardTitle);
		session.appendChild(cardHabitsTitle);

		habitsDataBase.forEach((habits) => {
			const Habits = new Homepage(
				habits.habit_id,
				habits.habit_title,
				habits.habit_description,
				habits.habit_category,
				habits.habit_status
			);

			const cardsHabits = Habits.getCardHabitsDate(habits);

			session.appendChild(cardsHabits);

			return cardsHabits;
		});

		const cardFooter = titleHabits.getCardFooter();
		session.appendChild(cardFooter);
	}

	static loadUserData() {
		const userData = localStorage.getItem("@kenzie-habits:user");

		const user = JSON.parse(userData);

		console.log(user);

		const userHeader = document.querySelector(".user__image--header");
		const userProfileImage = document.querySelector(".user__image--profile");

		console.log(userProfileImage);
		const userProfileName = document.querySelector(".user__name");

		userProfileName.innerText = user.usr_name;
		userHeader.src = user.usr_image;
		userProfileImage.src = user.usr_image;
	}

	static habitCompletionController() {
		const checkbox = document.querySelectorAll(".checkbox");
		checkbox.forEach((item) => {
			item.addEventListener("change", function () {
				if (this.checked) {
					const habitId = this.id;
					Habits.completeHabit(habitId);
					HomepageController.habitCompletionController();
				} else {
					const habitId = this.id;
					Habits.uncompleteHabit(habitId);
					HomepageController.habitCompletionController();
				}
			});
		});
	}
}

export default HomepageController;
