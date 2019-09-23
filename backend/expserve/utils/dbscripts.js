/*CREATE TABLE code_assesment(
	codeId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	courseId int NOT NULL,
	question LONGTEXT NOT NULL,
	isStdIn BOOLEAN,
	totalTestCases int NOT NULL,
	sampleStdIn VARCHAR(500) NOT NULL,
	sampleStdOut VARCHAR(500) NOT NULL,
	testCaseStdIn VARCHAR(500) NOT NULL,
	testCaseStdOut VARCHAR(500) NOT NULL,
	createdBy VARCHAR(100),
	createdOn DATETIME,
	totalSubmissions int,
	correctSubmissions int,
	allowedAttempts int NOT NULL,
	langsAllowed VARCHAR(100) NOT NULL,
	score int NOT NULL,
	isReviewd BOOLEAN,
	reviewedBy VARCHAR(100),
	reviewedOn DATETIME,
	duration int NOT NULL,
	startDateTime DATETIME NOT NULL,
	endDateTime DATETIME NOT NULL,
	totalRegCoders int,
	registeredCoders LONGTEXT
)*/

//coders base
/*
CREATE TABLE user_code_ref(
	refId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	codeId int NOT NULL,
	userId int NOT NULL,
	registerdOn DATETIME,
	finalSubmission LONGTEXT,
	isCorrect BOOLEAN,
	scores int,
	codeSubmittedOn DATETIME,
	timeTaken int,
	attempts int
)


*/