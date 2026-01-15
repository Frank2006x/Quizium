const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

async function migrateQuizAnswers() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully!");

    const db = mongoose.connection.db;
    const collection = db.collection("quizzes");

    // Find all quizzes with old answer format (array)
    const quizzes = await collection
      .find({
        "questions.answer.0": { $exists: true },
      })
      .toArray();

    console.log(`Found ${quizzes.length} quizzes to migrate`);

    if (quizzes.length === 0) {
      console.log("No quizzes need migration. All data is up to date!");
      return;
    }

    let migratedCount = 0;

    for (const quiz of quizzes) {
      let modified = false;

      quiz.questions.forEach((question) => {
        // Check if answer is an array [option, text]
        if (Array.isArray(question.answer) && question.answer.length === 2) {
          question.answer = {
            option: question.answer[0],
            text: question.answer[1],
          };
          modified = true;
        }
      });

      if (modified) {
        await collection.updateOne(
          { _id: quiz._id },
          { $set: { questions: quiz.questions } }
        );
        migratedCount++;
        console.log(
          `✓ Migrated quiz: ${quiz._id} (${quiz.topic} - ${quiz.difficulty})`
        );
      }
    }

    console.log(`\n✅ Migration completed successfully!`);
    console.log(`   Total migrated: ${migratedCount} quizzes`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

migrateQuizAnswers();
