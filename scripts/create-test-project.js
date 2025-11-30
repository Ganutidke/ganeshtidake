require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        tags: [{ type: String }],
        coverImage: {
            url: { type: String, required: true },
            public_id: { type: String, required: true },
        },
        category: [{ type: String, required: true }],
        repositoryUrl: { type: String },
        liveUrl: { type: String },
    },
    { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function createTestProject() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const project = new Project({
            title: 'Test Multi-Category Project',
            slug: 'test-multi-category-project',
            description: 'This is a test project.',
            tags: ['test', 'demo'],
            coverImage: {
                url: 'https://via.placeholder.com/1200x630',
                public_id: 'test_id',
            },
            category: ['Next.js', 'React'],
        });

        await project.save();
        console.log('Test project created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating test project:', error);
        process.exit(1);
    }
}

createTestProject();
