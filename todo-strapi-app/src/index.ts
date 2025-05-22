import { Core } from "@strapi/strapi";

export default {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Check if there are already tasks
    const existing = await strapi.entityService.findMany("api::task.task");

    if (existing.length === 0) {
      console.log("🌱 Inserting demo data...");

      // Create a demo tag (e.g.)
      const tag = await strapi.entityService.create("api::tag.tag", {
        data: { name: "urgent" },
      });

      // Create a demo category
      const cat = await strapi.entityService.create("api::category.category", {
        data: { name: "Work" },
      });

      // Create a demo worker
      const worker = await strapi.entityService.create("api::worker.worker", {
        data: {
          username: "demo_user",
          email: "demo@example.com",
        },
      });

      // Create a task
      await strapi.entityService.create("api::task.task", {
        data: {
          title: "Compile report",
          description: "Weekly report",
          completed: false,
          priority: "high",
          due_date: "2025-05-25T12:00:00Z",
          tags: tag.id,
          categories: cat.id,
          worker: worker.id,
          publishedAt: new Date().toISOString(),
        },
      });

      console.log("✅ Demo data inserted");
    }
  },
};
