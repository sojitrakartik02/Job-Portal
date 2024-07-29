import cron from "node-cron";
import { Job } from "../Models/jobSchema.js";
import { User } from "../Models/userSchema.js";
import { sendEmail } from "../utils/sendMali.js";

export const newsLetter = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Cron");
    try {
      const jobs = await Job.find({ newsLeterSent: false });
      for (const job of jobs) {
        console.log(`Processing job: ${job.title}, jobNiche: ${job.jobNiche}`); // Debug log

        if (!job.jobNiche) {
          console.warn(`Skipping job with missing jobNiche: ${job.title}`);
          continue;
        }

        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });

        for (const user of filteredUsers) {
          const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
          const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.companyName}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nNicheNest Team`;
          await sendEmail({
            email: user.email,
            subject,
            message,
          });
        }

        job.newsLeterSent = true;
        await job.save();
      }
    } catch (error) {
      console.error("Error in Node Cron", error);
    }
  });
};
