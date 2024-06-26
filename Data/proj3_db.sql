CREATE TABLE smmh_data (
	age DECIMAL,
	gender VARCHAR(10),
	relationship VARCHAR(25),
	occupation VARCHAR(25),
	organization VARCHAR(25),
	social_media BOOLEAN,
	sm_platforms VARCHAR(255),
	number_of_sm_platforms INT,
	hours_spent VARCHAR(25),
	frequency INT,
	distraction INT,
	restlessness INT,
	anxiety INT,
	concentration INT,
	self_compassion INT,
	post_sentiment INT,
	validation_seeking INT,
	depression INT,
	activity_interest_var INT,
	sleeplessness INT,
	reddit INT,
	youtube INT,
	snapchat INT,
	pinterest INT,
	tiktok INT,
	instagram INT,
	discord INT,
	facebook INT,
	twitter INT,
	two_to_five_hrs INT,
	less_than_two_hrs INT,
	more_than_five_hrs INT);
	

SELECT *
FROM smmh_data;