import { CMS } from 'tinacms';

function slugify(string: string): string {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export const RecipeCreatorPlugin = {
  __type: 'content-creator',
  name: 'New Recipe',
  fields: [
    {
      label: 'Title',
      name: 'title',
      component: 'text',
      validation(title) {
        if (!title) return 'Required';
      },
    },
    {
      label: 'Instructions',
      name: 'markdownBody',
      component: 'markdown',
      description: 'Recipe Instructions',
    },
  ],
  async onSubmit(values: any, cms: CMS) {
    // cms.api.github;
    const fileRelativePath = `./content/${slugify(values.title)}.json`;
    // Call functions that create the new blog post. For example:
    // cms.apis.someBackend.createPost(values);
    cms.api.github
      .upload(fileRelativePath, JSON.stringify(values), 'Update from TinaCMS')
      .then((response) => {
        console.log({ response });
        // setCachedFormData(fileRelativePath, {
        //   sha: response.content.sha,
        // });
        // if (this.afterCreate) {
        //   this.afterCreate(response);
        // }
      })
      .catch((e) => {
        console.error(e);
        // return { [FORM_ERROR]: e };
      });
  },
};
