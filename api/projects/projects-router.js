// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({
        message: "could not retrieve projects, please debug",
        error: err.message,
      });
    });
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).json({
          message: "the project with the specified id does not exist",
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "could not retrieve the project with the specified id, please debug",
        error: err.message,
      });
    });
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({
      message: "please provide a name and description",
    });
  } else {
    Projects.insert({ name, description })
      .then(({ id }) => {
        return Projects.get(id);
      })
      .then((newProject) => {
        res.status(201).json(newProject);
      })
      .catch((err) => {
        res.status(500).json({
          message: "a new project could not be created, please debug",
          error: err.message,
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({
      message: "please provide a name and description",
    });
  } else {
    Projects.get(req.params.id)
      .then((updated) => {
        if (!updated) {
          res.status(404).json({
            message: "the project with the specified id does not exist",
          });
        } else {
          return Projects.update(req.params.id, req.body);
        }
      })
      .then((updated) => {
        if (updated) {
          return Projects.get(req.params.id);
        }
      })
      .then((project) => {
        if (project) {
          res.json(project);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message:
            "the project with the specified id could not be update, please debug",
          error: err.message,
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "the project has been deleted",
        });
      } else {
        res.status(404).json({
          message: "the project with the specified id does not exist",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          "the project with the specified id could not be deleted, please debug",
        error: err.message,
      });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then((actions) => {
      if (!actions) {
        res.status(404).json({
          message: "the action with the specified id does not exist",
        });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "the actions for the specified project do not exist",
        error: err.message,
      });
    });
});

module.exports = router;
