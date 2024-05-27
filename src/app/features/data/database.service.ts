import { Injectable, inject } from '@angular/core';
import { setDoc, doc, Firestore, getDoc, collection, query, getDocs, where, DocumentReference, orderBy, limit } 
from '@angular/fire/firestore';
import { NameCollections } from 'src/app/core/enums/collectionNames';
import { enumDifficulties } from 'src/app/core/enums/difficulties';
import { MyResult } from 'src/app/core/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public firestore : Firestore;

  public readonly USERS_COLLECTION_NAME : NameCollections = NameCollections.USER;

  constructor()
  {
    this.firestore = inject(Firestore);
  }

  public getDocRef(collectionName : NameCollections, idDoc : string)
  {
    return getDoc(doc(this.firestore, collectionName, idDoc));
  }

  public getCollectionRef(collectionName : NameCollections)
  {
    return collection(this.firestore, collectionName);
  }
  
  public getResultOrdered(collectionName : NameCollections)
  {
    return getDocs(query(this.getCollectionRef(collectionName),orderBy("gameDurationMs", "asc"),limit(5)));
  }

  public saveGameResult(myResult : MyResult, difficulty : enumDifficulties)
  {
    let collectionName : NameCollections;

    switch(difficulty)
    {
      case enumDifficulties.EASY:
        collectionName = NameCollections.EASY_GAME
        break;

      case enumDifficulties.NORMAL:
        collectionName = NameCollections.NORMAL_GAME
        break;

      case enumDifficulties.HARD:
        collectionName = NameCollections.HARD_GAME
        break;
        
    }

    const docMyResult = doc(collection(this.firestore, collectionName));

    myResult.UID = docMyResult.id;

    return setDoc(docMyResult, myResult)
  }
}
