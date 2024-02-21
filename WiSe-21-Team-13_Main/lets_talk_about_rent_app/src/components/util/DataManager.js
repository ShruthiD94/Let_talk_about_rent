import { database } from "../../firebase";

export const GetArticleSchema = () => {
  return {
    author: "", // pass the current user uid in here
    title: "",
    address: {
      country: "",
      city: "",
      postalcode: "",
    },
    appartmentData: {
      // wil be used to for the quick overview panel
      "cold-rent": "",
      "warm-rent": "",
      area: "",
      rooms: "",
    },
    ratings: {
      // 0-5
      appartment: "",
      landlord: "",
      location: "",
    },
    questionnaire: {
      // this is not required
      // example topics
      // landlord, location, ...
      // e.g {title: "a", content: "b"}
    },
    metaData: {
      views: 0,
      likes: 0,
      bookmarks: 0,
    },
    userType: "",
    uid: "", // will be set by the post article function but has to be contained in an article
  };
};

export function PublishArticle(data) {
  const db = database;
  const ref = db.ref("articles");

  // check if the passed objects keys match the article schema keys
  if (
    JSON.stringify(Object.keys(data)) !==
    JSON.stringify(Object.keys(GetArticleSchema()))
  ) {
    console.log("Data didnt match Article Schema");
    return;
  }
  const newPostRef = ref.push();
  data.uid = newPostRef.key;
  return newPostRef.set(data);
}

export function CreateArticleFilterQuery(criteriaPath, valueOfCriteria) {
  // how to use:
  // critieriaPath is the path to the feature you want to query
  // the valueOfCriteria is the value you want to filter by
  // e.g.: CreateArticleFilterQuery("address/postalcode", "52062")
  // this will return a querry for all article with a postalcode of 52062
  return database
    .ref("articles/")
    .orderByChild(criteriaPath)
    .equalTo(valueOfCriteria);
}

export function GetUserData(uid) {
  return database.ref("users/" + uid).get();
}
